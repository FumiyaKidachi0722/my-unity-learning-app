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
        <div className="flex flex-col space-y-2">
          {options.map((option) => {
            const isSelected = option === selected;
            return (
              <Button
                key={option}
                variant="ghost"
                className={`
                  w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors border-2
                  ${
                    isSelected
                      ? "border-amber-400 bg-amber-400/20 text-white hover:bg-amber-400/30"
                      : "border-gray-600 bg-zinc-700 text-gray-200 hover:bg-zinc-600"
                  }`}
                onClick={() => {
                  setSelected(option);
                  setSubmitted(false);
                  setShowHint(false);
                }}
              >
                {/* 左側のラジオインジケーター */}
                <span
                  className={`
                    w-4 h-4 rounded-full flex-shrink-0 transition-colors
                    ${
                      isSelected
                        ? "bg-white/20"
                        : "border-2 border-gray-500 bg-transparent"
                    }`}
                />
                <span className="flex-1 text-left">{option}</span>
              </Button>
            );
          })}

          {/* 正誤フィードバック */}
          {submitted && (
            <div className="mt-3">
              {isCorrect ? (
                <p className="text-green-300">✅ 正解です！</p>
              ) : (
                <p className="text-red-300">❌ 不正解です…</p>
              )}
            </div>
          )}
        </div>
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

        {submitted && showHint && selected && (
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-white">
              {isCorrect ? "解説" : "ヒント"}
            </h4>
            <p className="mt-1 text-gray-200">{explanations[selected]}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
