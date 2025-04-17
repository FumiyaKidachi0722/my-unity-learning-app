"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import lessonsJson from "@/data/lessons.json";
import type { LessonData } from "@/types/lesson";

// unknown経由でLessonData[]にキャスト
const lessons = lessonsJson as unknown as LessonData[];

export const LessonSidebar: React.FC = () => {
  const pathname = usePathname(); // "/lesson/1" など
  const currentId = pathname?.split("/").pop(); // "1"

  return (
    <nav className="flex flex-col gap-2">
      {lessons.map((lesson) => {
        const isActive = lesson.id === currentId;
        return (
          <Link
            key={lesson.id}
            href={`/lesson/${lesson.id}`}
            className="w-full"
          >
            <Button
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={`
                justify-start w-full text-left
                ${
                  isActive
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "text-gray-200 hover:bg-zinc-700"
                }
              `}
            >
              {/* 横幅を制限して…で省略 */}
              <span className="block truncate max-w-[200px] px-2 py-1">
                {lesson.title}
              </span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
