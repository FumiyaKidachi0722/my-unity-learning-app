// src/app/page.tsx
"use client"; // クライアントコンポーネントとして記述

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { CustomButton } from "@/components/CustomButton";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ログイン状態を監視（認証済みなら dashboard へ遷移）
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました。");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました。");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl mb-4">Unity学習アプリへようこそ！</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-80"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-80"
      />
      <div className="flex">
        <CustomButton onClick={handleLogin}>ログイン</CustomButton>
        <CustomButton onClick={handleRegister}>新規登録</CustomButton>
      </div>
    </div>
  );
}
