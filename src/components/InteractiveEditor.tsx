// src/components/InteractiveEditor.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Snippet } from "@/types/lesson";

interface InteractiveEditorProps {
  initialBlockCode: string;
  initialCode: string;
  snippets: Snippet[];
  onCodeChange?: (code: string, mode: "block" | "text") => void;
}

export const InteractiveEditor: React.FC<InteractiveEditorProps> = ({
  initialBlockCode,
  initialCode,
  snippets,
  onCodeChange,
}) => {
  const [mode, setMode] = useState<"block" | "text">("text");
  const [blockCode, setBlockCode] = useState(initialBlockCode);
  const [textCode, setTextCode] = useState(initialCode);
  const [isOpen, setIsOpen] = useState(false);
  const [output, setOutput] = useState<string>("");

  const code = mode === "block" ? blockCode : textCode;

  const insertSnippet = (snippet: string) => {
    const updated = blockCode + snippet;
    setBlockCode(updated);
    onCodeChange?.(updated, "block");
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = e.target.value;
    setTextCode(updated);
    onCodeChange?.(updated, "text");
  };

  const handleRunCode = async () => {
    setOutput("実行中…");
    try {
      const res = await fetch("/api/jdoodle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_code: code }),
      });
      if (!res.ok) {
        setOutput(`エラー: ${res.statusText}`);
        return;
      }
      const data = await res.json();
      setOutput(data.output || data.stderr || "結果なし");
    } catch (err) {
      console.error(err);
      setOutput("実行中にエラーが発生しました。");
    }
  };

  const clearOutput = () => setOutput("");

  return (
    <div className="space-y-4 w-full">
      {/* アコーディオン開閉 */}
      <Button
        variant="default"
        className="w-full bg-amber-600 hover:bg-amber-500 text-white"
        onClick={() => setIsOpen((o) => !o)}
      >
        {isOpen ? "エディタを閉じる" : "エディタを開く"}
      </Button>

      {isOpen && (
        <Card className="w-full bg-zinc-800 border-zinc-600 text-gray-200">
          <CardContent className="p-4 space-y-4 w-full">
            {/* モード切替 */}
            <div className="flex space-x-2">
              <Button
                variant={mode === "block" ? "default" : "outline"}
                className={
                  mode === "block"
                    ? "bg-amber-500 hover:bg-amber-400 text-white flex-1"
                    : "text-gray-200 flex-1"
                }
                onClick={() => setMode("block")}
              >
                ブロックモード
              </Button>
              <Button
                variant={mode === "text" ? "default" : "outline"}
                className={
                  mode === "text"
                    ? "bg-amber-500 hover:bg-amber-400 text-white flex-1"
                    : "text-gray-200 flex-1"
                }
                onClick={() => setMode("text")}
              >
                テキストモード
              </Button>
            </div>

            {/* エディタエリア */}
            {mode === "block" ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  コードスニペットをクリックして挿入
                </p>
                <div className="flex flex-wrap gap-2">
                  {snippets.map((snip) => (
                    <Button
                      key={snip.label}
                      variant="outline"
                      className="border-zinc-600 text-gray-200 hover:bg-zinc-700"
                      onClick={() => insertSnippet(snip.code)}
                    >
                      {snip.label}
                    </Button>
                  ))}
                </div>
                <Textarea
                  value={blockCode}
                  readOnly
                  className="w-full h-96 bg-zinc-700 border-zinc-600 text-gray-200 placeholder-zinc-500"
                />
              </div>
            ) : (
              <Textarea
                value={textCode}
                onChange={handleTextChange}
                className="w-full h-[500px] bg-zinc-700 border-zinc-600 text-gray-200 font-mono placeholder-zinc-500"
                placeholder="ここに C# コードを入力..."
              />
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 w-full">
            <div className="flex space-x-2">
              {/* ブロックモード時は disabled */}
              <Button
                variant="default"
                className={`flex-1 text-white ${
                  mode === "block"
                    ? "bg-zinc-600 cursor-not-allowed opacity-50"
                    : "bg-amber-600 hover:bg-amber-500"
                }`}
                onClick={handleRunCode}
                disabled={mode === "block"}
              >
                コード実行
              </Button>

              <Button
                variant="outline"
                className="border-gray-500 text-gray-400 hover:bg-zinc-700 flex-1"
                onClick={clearOutput}
                disabled={mode === "block"}
              >
                実行結果クリア
              </Button>
            </div>

            {/* 出力エリア */}
            {output && (
              <pre className="w-full bg-zinc-700 text-gray-200 p-4 rounded whitespace-pre-wrap h-48 overflow-auto">
                {output}
              </pre>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
