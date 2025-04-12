// src/app/lesson/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { CodeEditor } from "@/components/CodeEditor";
import { Quiz } from "@/components/Quiz";
import lessons from "@/data/lessons.json";

// JSON 内のデータ型を定義
type QuizData = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanations: { [option: string]: string | undefined };
};

type LessonData = {
  id: string;
  title: string;
  content: string;
  sampleCode: string;
  duration: string;
  order: number;
  quizzes: QuizData[];
};

export default function LessonPage() {
  const { id } = useParams();

  // URL パラメータの id に該当するレッスンを抽出
  const lessonData: LessonData | undefined = lessons.find(
    (lesson: LessonData) => lesson.id === id
  );

  if (!lessonData) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">レッスンが見つかりません</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{lessonData.title}</h1>
      <article
        className="prose mb-4"
        dangerouslySetInnerHTML={{ __html: lessonData.content }}
      />
      <section className="mb-4">
        <h2 className="text-xl mb-2">実際にコードを試してみよう！</h2>
        <CodeEditor initialCode={lessonData.sampleCode} />
      </section>
      <section className="mb-4">
        <h2 className="text-xl mb-2">クイズに挑戦しよう！</h2>
        {lessonData.quizzes.map((quiz, index) => (
          <Quiz
            key={index}
            question={quiz.question}
            options={quiz.options}
            correctAnswer={quiz.correctAnswer}
            explanations={quiz.explanations}
          />
        ))}
      </section>
    </div>
  );
}
