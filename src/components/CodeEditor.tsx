// src/components/CodeEditor.tsx
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
      // JDoodle API のレスポンスは output に実行結果が格納されるため、result.output を参照します
      setOutput(result.output || result.stderr || "実行結果なし");
    } catch (error) {
      console.error("コード実行エラー:", error);
      setOutput("コード実行中にエラーが発生しました。");
    }
  };

  return (
    <div className="mb-4">
      {/* 折りたたみのトグルボタン */}
      <Button onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? "CodeEditorを閉じる" : "CodeEditorを開く"}
      </Button>
      {isExpanded && (
        <Card className="mt-2">
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-40 p-2 border"
              placeholder="ここに C# コードを入力..."
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button onClick={handleRunCode}>コード実行</Button>
            {output && (
              <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                {output}
              </pre>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
