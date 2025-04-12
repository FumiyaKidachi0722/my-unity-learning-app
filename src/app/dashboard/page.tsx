// src/app/dashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // NODE_ENV が 'production' の場合のみリダイレクトする
        if (process.env.NODE_ENV === "production") {
          router.push("/");
        }
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="py-8 text-center">
      <h1 className="text-3xl mb-4">マイダッシュボード</h1>
      {user ? (
        <p>ようこそ、{user.email} さん</p>
      ) : (
        <p>ユーザー情報を取得中です...</p>
      )}
      {/* ここに Firestore から進捗やバッジ情報を読み込んで表示する処理を追加 */}
    </div>
  );
}
