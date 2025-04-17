import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { LessonData } from "@/types/lesson";

interface LessonCardProps {
  lesson: LessonData;
  description: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  description,
}) => {
  return (
    <Card
      className="
      bg-zinc-800 border border-zinc-700 
      hover:border-amber-500 transition-colors
      flex flex-col
    "
    >
      <CardHeader className="px-6 pt-6 pb-2">
        {/* レッスン番号 */}
        <span className="inline-block mb-2 px-2 py-0.5 bg-amber-600 text-xs font-bold rounded-full text-white">
          Lesson {lesson.order}
        </span>
        {/* タイトル */}
        <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
      </CardHeader>

      <CardContent className="px-6 py-2 flex-1">
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </CardContent>

      <CardFooter className="px-6 py-4 flex items-center justify-between">
        {/* 所要時間バッジ */}
        <span className="text-sm text-gray-400">⏱ {lesson.duration}</span>
        {/* 詳細ボタン */}
        <Link href={`/lesson/${lesson.id}`}>
          <button
            className="
            bg-amber-600 text-white text-sm font-medium 
            px-4 py-2 rounded hover:bg-amber-500 
            transition-colors
          "
          >
            詳細を見る →
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};
