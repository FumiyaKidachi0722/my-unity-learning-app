// src/components/Quiz.tsx
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanations: Record<string, string>;
}

export const Quiz: React.FC<QuizProps> = ({
  question,
  options,
  correctAnswer,
  explanations,
}) => {
  const [selected, setSelected] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    // 正解なら自動で解説表示
    if (selected === correctAnswer) {
      setShowHint(true);
    }
  };

  const isCorrect = submitted && selected === correctAnswer;

  return (
    <Card className="mb-6 bg-zinc-800 border-zinc-600 text-gray-200">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">{question}</h3>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 list-none p-0">
          {options.map((option) => {
            const isSelected = option === selected;
            return (
              <li key={option}>
                <label className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name={question}
                    value={option}
                    checked={isSelected}
                    onChange={() => {
                      setSelected(option);
                      setSubmitted(false);
                      setShowHint(false);
                    }}
                    className="mt-1 accent-amber-500"
                  />
                  <span className="text-gray-200">{option}</span>
                </label>
                {submitted && isSelected && (
                  <p
                    className={`mt-1 ml-8 text-sm ${
                      isCorrect ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    {isCorrect ? "✅ 正解です！" : "❌ 不正解です…"}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-amber-600 text-amber-400 hover:bg-zinc-700"
            onClick={handleSubmit}
            disabled={!selected}
          >
            回答
          </Button>

          {/* 不正解時のみヒントボタンを表示 */}
          {submitted && !isCorrect && (
            <Button
              variant="outline"
              className="border-gray-500 text-gray-400 hover:bg-zinc-700"
              onClick={() => setShowHint((v) => !v)}
            >
              {showHint ? "ヒントを隠す" : "ヒントを見る"}
            </Button>
          )}
        </div>

        {/* 解説表示 */}
        {submitted && showHint && selected && (
          <div className="mt-2 ml-0">
            <h4 className="text-sm font-semibold text-white">
              {isCorrect ? "解説" : "ヒント"}
            </h4>
            <p className="mt-1 ml-2 text-gray-200">{explanations[selected]}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
