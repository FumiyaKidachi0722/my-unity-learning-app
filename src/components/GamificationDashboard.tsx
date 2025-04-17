"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Badge {
  id: string;
  name: string;
}
interface DailyChallenge {
  id: string;
  title: string;
  completed: boolean;
}

interface GamificationProps {
  badges: Badge[];
  level: number;
  points: number;
  daily: DailyChallenge[];
}

export const GamificationDashboard: React.FC<GamificationProps> = ({
  badges,
  level,
  points,
  daily,
}) => (
  <Card className="space-y-4 bg-zinc-800 border-zinc-600 text-gray-200">
    <CardHeader>
      <h2 className="text-2xl text-white">マイステータス</h2>
    </CardHeader>
    <CardContent className="space-y-2">
      <p>
        レベル: <span className="text-amber-400">{level}</span>
      </p>
      <p>
        ポイント: <span className="text-amber-400">{points}</span>
      </p>

      <div>
        <h3 className="font-semibold text-white">バッジ</h3>
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <span
              key={b.id}
              className="bg-amber-600 text-zinc-800 px-3 py-1 rounded-full text-sm"
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-white">デイリーチャレンジ</h3>
        <ul className="space-y-1">
          {daily.map((c) => (
            <li key={c.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={c.completed}
                readOnly
                className="accent-amber-500"
              />
              <span className={c.completed ? "line-through text-gray-400" : ""}>
                {c.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);
