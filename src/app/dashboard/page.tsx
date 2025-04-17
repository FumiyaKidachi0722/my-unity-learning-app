// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import progressData from "@/data/progress.json";
import type { LessonProgress, Badge, ProgressData } from "@/types/dashboard";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<LessonProgress[]>(
    []
  );
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    // ダミーとして認証済みと判断しメールアドレスをセット
    setUserEmail("student@example.com");

    // ダミーデータの型キャスト
    const data = progressData as ProgressData;
    setCompletedLessons(data.completedLessons);
    setBadges(data.badges);
  }, []);

  if (!userEmail) {
    return (
      <div className="py-8 text-center">
        <p>ユーザー情報を取得中です...</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-xl mx-auto">
      <h1 className="text-3xl mb-4">マイダッシュボード</h1>
      <p className="mb-6">
        ようこそ、<strong>{userEmail}</strong> さん！
      </p>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">完了したレッスン</h2>
        {completedLessons.length > 0 ? (
          <ul className="list-disc list-inside">
            {completedLessons.map(({ id, title }) => (
              <li key={id}>
                {title} (ID: {id})
              </li>
            ))}
          </ul>
        ) : (
          <p>まだレッスンを完了していません。</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl mb-2">獲得したバッジ</h2>
        {badges.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {badges.map(({ id, name }) => (
              <li
                key={id}
                className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full"
              >
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <p>まだバッジがありません。</p>
        )}
      </section>
    </div>
  );
}
