import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { createProfile, fetchProfile, saveRemoteProgress, updateRemoteProfile } from '../services/database';
import { storage } from '../services/storage';
import type { Profile, UserProgress } from '../types';

type AuthContextValue = {
  session: Session | null;
  profile: Profile | null;
  progress: UserProgress[];
  loading: boolean;
  demoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  enterDemo: () => Promise<void>;
  signOut: () => Promise<void>;
  completeLesson: (lessonId: string, score: number, xpReward: number) => Promise<void>;
  updateName: (name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const demoProfile: Profile = {
  id: 'demo-user', name: 'Willians', email: 'demo@deutschmaster.app', current_belt: 'white', cefr_level: 'A0', xp: 120, streak: 4, completed_lessons: 2, created_at: new Date().toISOString(),
};

function getErrorMessage(message?: string) {
  if (!message) return 'Algo não saiu como esperado. Tente novamente.';
  if (message.toLowerCase().includes('invalid login')) return 'E-mail ou senha incorretos.';
  if (message.toLowerCase().includes('already registered')) return 'Este e-mail já está cadastrado.';
  if (message.toLowerCase().includes('password')) return 'A senha precisa ter pelo menos 6 caracteres.';
  return message;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const localProfile = await storage.getProfile();
      const localProgress = await storage.getProgress();
      if (!mounted) return;
      setProgress(localProgress);
      if (localProfile) {
        setProfile(localProfile);
        setDemoMode(localProfile.id === 'demo-user');
      }
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session && mounted) {
          setSession(data.session);
          const remoteProfile = await fetchProfile(data.session.user.id);
          if (remoteProfile) {
            setProfile(remoteProfile);
            await storage.saveProfile(remoteProfile);
          }
        }
        const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
          setSession(nextSession);
          if (nextSession) {
            setTimeout(() => {
              void fetchProfile(nextSession.user.id).then(async (remoteProfile) => {
                if (remoteProfile) {
                  setProfile(remoteProfile);
                  await storage.saveProfile(remoteProfile);
                }
              });
            }, 0);
          }
        });
        if (mounted) setLoading(false);
        return () => { listener.subscription.unsubscribe(); };
      }
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session, profile, progress, loading, demoMode,
    async signIn(email, password) {
      if (!supabase) {
        if (email.trim() && password.trim().length >= 6) {
          await storage.saveProfile({ ...demoProfile, email: email.trim() });
          setProfile({ ...demoProfile, email: email.trim() });
          setDemoMode(true);
          return {};
        }
        return { error: 'Informe um e-mail e uma senha com pelo menos 6 caracteres.' };
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) return { error: getErrorMessage(error.message) };
      setSession(data.session);
      return {};
    },
    async signUp(name, email, password) {
      if (!supabase) {
        const newProfile = { ...demoProfile, name: name.trim(), email: email.trim(), xp: 0, streak: 0, completed_lessons: 0, created_at: new Date().toISOString() };
        await storage.saveProfile(newProfile);
        setProfile(newProfile);
        setDemoMode(true);
        return {};
      }
      const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { name: name.trim() } } });
      if (error) return { error: getErrorMessage(error.message) };
      if (data.user) {
        const newProfile: Profile = { id: data.user.id, name: name.trim(), email: email.trim(), current_belt: 'white', cefr_level: 'A0', xp: 0, streak: 0, completed_lessons: 0, created_at: new Date().toISOString() };
        await createProfile(newProfile);
        await storage.saveProfile(newProfile);
        setProfile(newProfile);
      }
      setSession(data.session);
      return {};
    },
    async enterDemo() {
      await storage.saveProfile(demoProfile);
      setProfile(demoProfile);
      setDemoMode(true);
    },
    async signOut() {
      if (supabase) await supabase.auth.signOut();
      await storage.clearProfile();
      setSession(null); setProfile(null); setDemoMode(false); setProgress([]);
    },
    async completeLesson(lessonId, score, xpReward) {
      if (!profile) return;
      const alreadyDone = progress.some((item) => item.lesson_id === lessonId && item.completed);
      const nextProfile = alreadyDone ? profile : { ...profile, xp: profile.xp + xpReward, completed_lessons: profile.completed_lessons + 1, streak: Math.max(profile.streak, 1) };
      const nextProgress = alreadyDone ? progress : [...progress, { id: `${profile.id}-${lessonId}`, user_id: profile.id, lesson_id: lessonId, completed: true, score, created_at: new Date().toISOString() }];
      setProfile(nextProfile); setProgress(nextProgress);
      await storage.saveProfile(nextProfile); await storage.saveProgress(nextProgress);
      if (!demoMode) {
        await updateRemoteProfile(profile.id, { xp: nextProfile.xp, completed_lessons: nextProfile.completed_lessons, streak: nextProfile.streak });
        if (!alreadyDone) await saveRemoteProgress(nextProgress[nextProgress.length - 1]);
      }
    },
    async updateName(name) {
      if (!profile || !name.trim()) return;
      const nextProfile = { ...profile, name: name.trim() };
      setProfile(nextProfile); await storage.saveProfile(nextProfile);
      if (!demoMode) await updateRemoteProfile(profile.id, { name: nextProfile.name });
    },
  }), [session, profile, progress, loading, demoMode]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro de AuthProvider');
  return context;
}

export { isSupabaseConfigured };
