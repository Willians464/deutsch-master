import type { BeltId } from '../constants/belts';

export type Profile = {
  id: string;
  name: string;
  email: string;
  current_belt: BeltId;
  cefr_level: string;
  xp: number;
  streak: number;
  completed_lessons: number;
  created_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score: number;
  created_at: string;
};
