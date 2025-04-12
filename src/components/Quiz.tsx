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
  explanations: { [option: string]: string | undefined };
}

export const Quiz: React.FC<QuizProps> = ({
  question,
  options,
  correctAnswer,
  explanations,
}) => {
  const [selected, setSelected] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleSubmit = () => {
    if (!selected) return;
    const isCorrect = selected === correctAnswer;
    setResult(isCorrect ? "正解！" : "不正解...");
  };

  return (
    <Card className="p-4 mb-4">
      <CardHeader>
        <h3 className="text-lg font-semibold mb-2">{question}</h3>
      </CardHeader>
      <CardContent>
        <ul className="mb-2">
          {options.map((option) => (
            <li key={option} className="mb-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="quiz"
                  value={option}
                  className="mr-2"
                  onChange={() => setSelected(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button onClick={handleSubmit}>回答する</Button>
        {result && (
          <>
            <p className="mt-2 font-bold">{result}</p>
            <div className="mt-2">
              {options.map((option) => (
                <div key={option} className="mb-1">
                  <strong>{option}:</strong> {explanations[option]}
                </div>
              ))}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
