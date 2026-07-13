export type LessonExercise = {
  id: string;
  type: 'translation' | 'gap' | 'listen' | 'dialogue';
  prompt: string;
  helper?: string;
  options: string[];
  answer: string;
};

export type Lesson = {
  id: string;
  belt: string;
  title: string;
  subtitle: string;
  description: string;
  xpReward: number;
  duration: string;
  unlocked: boolean;
  exercises: LessonExercise[];
};

export const lessons: Lesson[] = [
  {
    id: 'lesson-1', belt: 'white', title: 'Apresentação', subtitle: 'Hallo, ich bin…', description: 'Apresente-se e abra sua primeira conversa.', xpReward: 40, duration: '6 min', unlocked: true,
    exercises: [
      { id: 'ex-1', type: 'translation', prompt: 'Como dizer “Eu aprendo alemão”?', helper: 'Escolha a tradução correta.', options: ['Ich lerne Deutsch.', 'Ich spreche Deutschland.', 'Ich habe Deutsch.'], answer: 'Ich lerne Deutsch.' },
      { id: 'ex-2', type: 'translation', prompt: 'Ich komme aus Brasilien.', helper: 'O que esta frase significa?', options: ['Eu moro na Alemanha.', 'Eu venho do Brasil.', 'Eu falo português.'], answer: 'Eu venho do Brasil.' },
      { id: 'ex-3', type: 'gap', prompt: 'Complete: Guten ___', helper: 'Uma saudação para a manhã.', options: ['Morgen', 'Nacht', 'Woche'], answer: 'Morgen' },
      { id: 'ex-4', type: 'dialogue', prompt: 'Wie geht es dir?', helper: 'Responda de forma positiva.', options: ['Mir geht es gut.', 'Ich komme aus Berlin.', 'Bis morgen.'], answer: 'Mir geht es gut.' },
    ],
  },
  { id: 'lesson-2', belt: 'white', title: 'Sua primeira rotina', subtitle: 'Der Alltag', description: 'Palavras que acompanham todos os seus dias.', xpReward: 45, duration: '7 min', unlocked: true, exercises: [] },
  { id: 'lesson-3', belt: 'yellow', title: 'No café', subtitle: 'Ein Kaffee, bitte', description: 'Peça, agradeça e aproveite a pausa.', xpReward: 55, duration: '8 min', unlocked: false, exercises: [] },
  { id: 'lesson-4', belt: 'yellow', title: 'Na estação', subtitle: 'Nächster Halt', description: 'Entenda placas e compre seu bilhete.', xpReward: 55, duration: '8 min', unlocked: false, exercises: [] },
];

export type Mission = {
  id: string;
  title: string;
  label: string;
  icon: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
};

export const starterMissions: Mission[] = [
  { id: 'mission-listen', title: 'Ouvir 5 minutos', label: 'Escuta', icon: 'Headphones', progress: 3, target: 5, xpReward: 15, completed: false },
  { id: 'mission-speak', title: 'Falar 10 frases', label: 'Sprechen', icon: 'MessageCircle', progress: 4, target: 10, xpReward: 20, completed: false },
  { id: 'mission-words', title: 'Aprender 8 palavras', label: 'Vocabulário', icon: 'BookOpen', progress: 8, target: 8, xpReward: 25, completed: true },
  { id: 'mission-lesson', title: 'Concluir 1 lição', label: 'Jornada', icon: 'Flag', progress: 0, target: 1, xpReward: 40, completed: false },
  { id: 'mission-review', title: 'Revisar conteúdo antigo', label: 'Revisão', icon: 'RotateCcw', progress: 0, target: 1, xpReward: 15, completed: false },
];
