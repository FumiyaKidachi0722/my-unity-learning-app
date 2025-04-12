// src/app/lesson/page.tsx
"use client";

import React from "react";
import lessonsData from "@/data/lessons.json";
import { LessonCard } from "@/components/LessonCard";

// レッスン一覧を表示するための型定義
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

const getTextFromHTML = (html: string): string => {
  return html.replace(/<[^>]+>/g, "");
};

export default function LessonsPage() {
  // JSON データを型定義に合わせてキャスト
  const lessons: LessonData[] = lessonsData;

  // 表示用の説明を、content から抜粋（先頭 100 文字＋...）
  const getDescription = (htmlContent: string) => {
    const text = getTextFromHTML(htmlContent).trim();
    return text.length > 100 ? text.slice(0, 100) + "..." : text;
  };

  // Order 順にソート（order が小さいほど上位）
  const sortedLessons = lessons.sort((a, b) => a.order - b.order);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">レッスン一覧</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lessonId={lesson.id}
            title={lesson.title}
            description={getDescription(lesson.content)}
          />
        ))}
      </div>
    </div>
  );
}
