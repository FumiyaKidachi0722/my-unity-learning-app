// src/components/CustomButton.tsx
import React from "react";
import { Button } from "./ui/button";

interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <Button onClick={onClick} variant="default" className="m-2">
      {children}
    </Button>
  );
};
