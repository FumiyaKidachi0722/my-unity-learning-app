// src/components/LessonDetails.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface LessonDetailsProps {
  id: string;
  title: string;
  overview: string;
  details: string[];
}

export const LessonDetails: React.FC<LessonDetailsProps> = ({
  id,
  title,
  overview,
  details,
}) => {
  return (
    <Card className="mb-6 bg-zinc-800 border-zinc-600 text-gray-200">
      <CardHeader>
        <h2 className="text-2xl font-bold text-white">
          Lesson {id}: {title}
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 概要 */}
        <section>
          <h3 className="text-xl font-semibold text-amber-400 mb-2">概要</h3>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: overview }}
          />
        </section>

        {/* 内容 */}
        <section>
          <h3 className="text-xl font-semibold text-amber-400 mb-2">内容</h3>
          <ol className="list-decimal list-inside space-y-3 prose prose-invert max-w-none">
            {details.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </section>
      </CardContent>
    </Card>
  );
};
