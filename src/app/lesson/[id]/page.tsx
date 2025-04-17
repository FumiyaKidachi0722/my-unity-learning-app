"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import lessonsJson from "@/data/lessons.json";
import type { LessonData } from "@/types/lesson";
import { LessonDetails } from "@/components/LessonDetails";
import { InteractiveEditor } from "@/components/InteractiveEditor";
import { Quiz } from "@/components/Quiz";
import { Button } from "@/components/ui/button";

const lessons = lessonsJson as unknown as LessonData[];

export default function LessonPage() {
  const { id } = useParams();
  const lessonIndex = lessons.findIndex((l) => l.id === id);
  if (lessonIndex === -1) {
    return <p className="text-center text-red-400">レッスンが見つかりません</p>;
  }

  const lesson = lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  return (
    <div>
      {/* レッスン詳細 */}
      <LessonDetails
        title={lesson.title}
        overview={lesson.content}
        details={lesson.details}
      />

      {/* 実践ワーク */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-white mb-2">
          コードを試してみよう！
        </h3>
        <InteractiveEditor
          initialBlockCode={lesson.blockCode}
          initialCode={lesson.sampleCode}
          snippets={lesson.snippets}
        />
      </section>

      {/* クイズ */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-white mb-4">クイズに挑戦</h3>
        <div className="space-y-4">
          {lesson.quizzes.map((q, i) => (
            <Quiz
              key={i}
              question={q.question}
              options={q.options}
              correctAnswer={q.correctAnswer}
              explanations={q.explanations}
            />
          ))}
        </div>
      </section>

      {/* 前後 & 一覧ナビゲーション（中央寄せ） */}
      <div className="mt-8 max-w-xl mx-auto px-4">
        <div className="flex justify-center items-center gap-4">
          {/* 前のレッスン */}
          {prevLesson ? (
            <Link href={`/lesson/${prevLesson.id}`}>
              <Button
                variant="outline"
                className="
                  px-4 py-2 
                  border-amber-600 text-amber-400 
                  hover:bg-amber-600 hover:text-white
                  transition-colors
                "
              >
                ← 前のレッスン
              </Button>
            </Link>
          ) : (
            <Button
              disabled
              className="
                px-4 py-2 
                border-amber-600 text-amber-400 
                opacity-50 cursor-not-allowed
              "
            >
              ← 前のレッスン
            </Button>
          )}

          {/* レッスン一覧へ */}
          <Link href="/lesson">
            <Button
              variant="secondary"
              className="
                px-4 py-2 
                bg-amber-600 text-white 
                hover:bg-amber-500 
                transition-colors
              "
            >
              レッスン一覧へ
            </Button>
          </Link>

          {/* 次のレッスン */}
          {nextLesson ? (
            <Link href={`/lesson/${nextLesson.id}`}>
              <Button
                variant="outline"
                className="
                  px-4 py-2 
                  border-amber-600 text-amber-400 
                  hover:bg-amber-600 hover:text-white
                  transition-colors
                "
              >
                次のレッスン →
              </Button>
            </Link>
          ) : (
            <Button
              disabled
              className="
                px-4 py-2 
                border-amber-600 text-amber-400 
                opacity-50 cursor-not-allowed
              "
            >
              次のレッスン →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
