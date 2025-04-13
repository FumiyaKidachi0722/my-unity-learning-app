// src/components/LessonSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import lessons from "@/data/lessons.json";
import { cn } from "@/lib/utils";

// レッスンデータの型定義（必要に応じて調整）
type LessonData = {
  id: string;
  title: string;
  // その他のプロパティは省略
};

export const LessonSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4">
      {lessons.map((lesson: LessonData) => (
        <Button
          key={lesson.id}
          asChild
          variant={pathname === `/lesson/${lesson.id}` ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === `/lesson/${lesson.id}` && "bg-accent"
          )}
        >
          <Link href={`/lesson/${lesson.id}`}>{lesson.title}</Link>
        </Button>
      ))}
    </nav>
  );
};
