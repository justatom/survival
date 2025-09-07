export interface User {
  nickname: string;
  fullName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'text' | 'range';
  options?: string[];
  correct?: string;
  min?: number;
  max?: number;
}

export interface Answer {
  questionId: number;
  answer: string | number;
}

export interface QuizState {
  user: User | null;
  currentQuestion: number;
  answers: Answer[];
  score: number;
}
