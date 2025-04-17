// src/components/LessonPlayer.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface LessonStep {
  type: "text" | "video" | "image";
  content: string;
}

interface LessonPlayerProps {
  steps: LessonStep[];
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({ steps }) => {
  const [current, setCurrent] = useState(0);
  const step = steps[current];

  return (
    <Card className="space-y-4">
      <CardContent>
        {step.type === "text" && (
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: step.content }}
          />
        )}
        {step.type === "video" && (
          <video src={step.content} controls className="w-full rounded" />
        )}
        {step.type === "image" && (
          <img
            src={step.content}
            alt={`step-${current}`}
            className="w-full rounded"
          />
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={current === 0}
          onClick={() => setCurrent((i) => i - 1)}
        >
          前へ
        </Button>
        <span>
          {current + 1} / {steps.length}
        </span>
        <Button
          variant="outline"
          disabled={current === steps.length - 1}
          onClick={() => setCurrent((i) => i + 1)}
        >
          次へ
        </Button>
      </CardFooter>
    </Card>
  );
};
