"use client";

import React from "react";
import lessonsJson from "@/data/lessons.json";
import { LessonCard } from "@/components/LessonCard";
import { LessonData } from "@/types/lesson";

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

export default function LessonsPage() {
  const lessons = lessonsJson as unknown as LessonData[];

  // 抜粋説明を生成
  const getDescription = (html: string) => {
    const text = stripHtml(html).trim();
    return text.length > 80 ? text.slice(0, 80) + "…" : text;
  };

  // order順
  const sorted = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-white">レッスン一覧</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            description={getDescription(lesson.content)}
          />
        ))}
      </div>
    </div>
  );
}
