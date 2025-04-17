import React from "react";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
}) => (
  <Button
    onClick={onClick}
    variant="secondary"
    className="m-2 bg-amber-600 text-white hover:bg-amber-500"
  >
    {children}
  </Button>
);
