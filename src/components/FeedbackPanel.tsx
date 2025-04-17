"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeedbackPanelProps {
  code: string;
  onResult?: (output: string) => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  code,
  onResult,
}) => {
  const [output, setOutput] = useState("実行待機中…");

  const runCode = async () => {
    setOutput("実行中…");
    const res = await fetch("/api/jdoodle", {
      method: "POST",
      body: JSON.stringify({ source_code: code }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const out = data.output || data.stderr || "結果なし";
    setOutput(out);
    onResult?.(out);
  };

  return (
    <Card className="space-y-2 bg-zinc-800 border-zinc-600 text-gray-200">
      <CardContent>
        <Button
          variant="secondary"
          className="bg-amber-600 text-white hover:bg-amber-500"
          onClick={runCode}
        >
          実行
        </Button>
      </CardContent>
      <CardFooter>
        <pre className="whitespace-pre-wrap bg-zinc-700 text-gray-200 p-2 rounded">
          {output}
        </pre>
      </CardFooter>
    </Card>
  );
};
