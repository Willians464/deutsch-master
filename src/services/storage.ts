import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Profile, UserProgress } from '../types';
import type { Mission } from '../data/lessons';

const PROFILE_KEY = '@deutsch-master/profile';
const PROGRESS_KEY = '@deutsch-master/progress';
const MISSIONS_KEY = '@deutsch-master/missions';

export const storage = {
  async getProfile(): Promise<Profile | null> {
    const value = await AsyncStorage.getItem(PROFILE_KEY);
    return value ? (JSON.parse(value) as Profile) : null;
  },
  async saveProfile(profile: Profile) {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },
  async clearProfile() {
    await AsyncStorage.removeItem(PROFILE_KEY);
    await AsyncStorage.removeItem(PROGRESS_KEY);
    await AsyncStorage.removeItem(MISSIONS_KEY);
  },
  async getProgress(): Promise<UserProgress[]> {
    const value = await AsyncStorage.getItem(PROGRESS_KEY);
    return value ? (JSON.parse(value) as UserProgress[]) : [];
  },
  async saveProgress(progress: UserProgress[]) {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  },
  async getMissions(): Promise<Mission[]> {
    const value = await AsyncStorage.getItem(MISSIONS_KEY);
    return value ? (JSON.parse(value) as Mission[]) : [];
  },
  async saveMissions(missions: Mission[]) {
    await AsyncStorage.setItem(MISSIONS_KEY, JSON.stringify(missions));
  },
};
