// src/components/Header.tsx
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Unity学習アプリ
        </Link>
        <nav className="flex space-x-6">
          <Link
            href="/"
            className="hover:underline hover:text-gray-300 transition-colors"
          >
            ホーム
          </Link>
          <Link
            href="/lesson"
            className="hover:underline hover:text-gray-300 transition-colors"
          >
            レッスン一覧
          </Link>
          <Link
            href="/dashboard"
            className="hover:underline hover:text-gray-300 transition-colors"
          >
            ダッシュボード
          </Link>
        </nav>
      </div>
    </header>
  );
};
