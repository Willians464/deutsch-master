import { supabase } from './supabaseClient';
import type { Profile, UserProgress } from '../types';

export async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  return data as Profile | null;
}

export async function createProfile(profile: Profile) {
  if (!supabase) return;
  await supabase.from('profiles').upsert(profile);
}

export async function updateRemoteProfile(userId: string, changes: Partial<Profile>) {
  if (!supabase) return;
  await supabase.from('profiles').update(changes).eq('id', userId);
}

export async function saveRemoteProgress(progress: UserProgress) {
  if (!supabase) return;
  await supabase.from('user_progress').upsert(progress);
}
