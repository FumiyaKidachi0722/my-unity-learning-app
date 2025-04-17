import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  initialCode: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRunCode = async () => {
    setOutput("コードを送信中...");
    try {
      const response = await fetch(`/api/jdoodle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_code: code }),
      });

      if (!response.ok) {
        setOutput(`エラー: ${response.statusText}`);
        return;
      }

      const result = await response.json();
      setOutput(result.output || result.stderr || "実行結果なし");
    } catch (error) {
      console.error("コード実行エラー:", error);
      setOutput("コード実行中にエラーが発生しました。");
    }
  };

  return (
    <div className="mb-4">
      <Button
        variant="secondary"
        className="bg-amber-600 text-white hover:bg-amber-500"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? "コードを閉じる" : "コードを開く"}
      </Button>
      {isExpanded && (
        <Card className="mt-2 bg-zinc-800 border-zinc-600 text-gray-200">
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-40 p-2 bg-zinc-700 border-zinc-600 text-gray-200 placeholder-zinc-500"
              placeholder="ここに C# コードを入力..."
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              variant="secondary"
              className="bg-amber-600 text-white hover:bg-amber-500"
              onClick={handleRunCode}
            >
              コード実行
            </Button>
            {output && (
              <pre className="bg-zinc-700 text-gray-200 p-2 rounded whitespace-pre-wrap">
                {output}
              </pre>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
