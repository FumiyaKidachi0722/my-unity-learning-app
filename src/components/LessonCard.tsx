// src/components/LessonCard.tsx
import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface LessonCardProps {
  lessonId: string;
  title: string;
  description: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lessonId,
  title,
  description,
}) => {
  return (
    <Card className="shadow hover:shadow-lg transition duration-200">
      <CardHeader>
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/lesson/${lessonId}`} className="text-gray-800">
          レッスン詳細を見る
        </Link>
      </CardFooter>
    </Card>
  );
};
