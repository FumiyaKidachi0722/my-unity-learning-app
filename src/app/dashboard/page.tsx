"use client";

import { useEffect, useState } from "react";
import progressData from "@/data/progress.json";
import type { ProgressData } from "@/types/dashboard";
import Link from "next/link";

// shadcn/ui コンポーネント
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge as UiBadge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const [data, setData] = useState<ProgressData | null>(null);

  useEffect(() => {
    setData(progressData as ProgressData);
  }, []);

  if (!data) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">ダッシュボードを読み込み中…</p>
      </div>
    );
  }

  const {
    userEmail,
    totalLessons,
    completedCount,
    completionRate,
    loginStreak,
    totalTimeSpentMinutes,
    upcomingLessons,
    completedLessons,
    badges,
  } = data;

  return (
    <div className="py-10 px-6 max-w-4xl mx-auto space-y-10">
      {/* ヘッダー */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">マイダッシュボード</h1>
          <p className="mt-1 text-gray-700">
            ようこそ、<strong>{userEmail}</strong> さん！
          </p>
        </div>
        <Avatar>
          <AvatarImage src="/avatar-placeholder.png" alt="User avatar" />
          <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </header>

      <Separator />

      {/* サマリーカード群 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>進捗率</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-3xl font-semibold">{completionRate}%</p>
            <Progress value={completionRate} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>完了レッスン</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {completedCount} / {totalLessons}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>連続ログイン</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{loginStreak} 日</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>学習時間</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalTimeSpentMinutes} 分</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 次のレッスン */}
      {upcomingLessons.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">次のレッスン</h2>
          <ul className="space-y-2">
            {upcomingLessons.map(({ id, title }) => (
              <Card key={id} className="hover:bg-gray-50 transition">
                <CardContent>
                  <Link
                    href={`/lesson/${id}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {title}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </ul>
        </section>
      )}

      <Separator />

      {/* 完了レッスン一覧 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">完了したレッスン</h2>
        {completedLessons.length > 0 ? (
          <ul className="space-y-3">
            {completedLessons.map(({ id, title, completedAt }) => (
              <Card key={id} className="flex justify-between items-center">
                <CardContent>
                  <p className="font-medium">{title}</p>
                </CardContent>
                <CardFooter>
                  <time className="text-sm text-gray-500">
                    {new Date(completedAt).toLocaleDateString()}
                  </time>
                </CardFooter>
              </Card>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">まだレッスンを完了していません。</p>
        )}
      </section>

      <Separator />

      {/* バッジセクション */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">獲得したバッジ</h2>
        {badges.length > 0 ? (
          <ul className="flex flex-wrap gap-4">
            {badges.map(({ id, name, description }) => (
              <li key={id} className="flex flex-col items-center space-y-1">
                <UiBadge variant="secondary">{name}</UiBadge>
                {description && (
                  <p className="text-center text-sm text-gray-500">
                    {description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">まだバッジがありません。</p>
        )}
      </section>
    </div>
  );
}
