// src/app/lesson/[id]/layout.tsx

import React from "react";
import { LessonSidebar } from "@/components/LessonSidebar";

export const metadata = {
  title: "Unity学習アプリ",
  description: "小学生向け Unity＆C# 学習Webアプリ",
};

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* レッスン領域 */}
      <div className="flex flex-1">
        {/* サイドバー */}
        <aside
          className="
            hidden md:block
            w-[240px]
            h-screen
            overflow-y-auto
            sticky top-0
            border-r
          "
        >
          {/* サイドバー内にパディングを入れ、左余白を最小限に */}
          <div className="py-4 px-2">
            <LessonSidebar />
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
