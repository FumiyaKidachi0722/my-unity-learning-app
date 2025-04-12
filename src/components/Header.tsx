// src/components/Header.tsx
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Unity学習アプリ</h1>
      <nav>
        <Link href="/" className="mr-4 hover:underline">
          ホーム
        </Link>
        <Link href="/lesson" className="mr-4 hover:underline">
          レッスン一覧
        </Link>
        <Link href="/dashboard" className="hover:underline">
          ダッシュボード
        </Link>
      </nav>
    </header>
  );
};
