// src/types/lesson.ts
export type QuizData = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanations: Record<string, string>;
};

export type Snippet = {
  label: string;
  code: string;
};

export type LessonData = {
  id: string;
  title: string;
  snippets: Snippet[];
  content: string;
  details: string[];
  sampleCode: string;
  blockCode: string;
  duration: string;
  order: number;
  quizzes: QuizData[];
};
