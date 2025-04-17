import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-zinc-900 text-gray-200 px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Unity学習アプリ
        </Link>
        <nav className="flex space-x-6">
          {["ホーム", "レッスン一覧", "ダッシュボード"].map((label) => (
            <Link
              key={label}
              href={
                label === "ホーム"
                  ? "/"
                  : label === "レッスン一覧"
                  ? "/lesson"
                  : "/dashboard"
              }
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
