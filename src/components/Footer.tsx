// src/components/Footer.tsx
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-center p-4 mt-auto">
      <p>
        &copy; {new Date().getFullYear()} Unity学習アプリ. All rights reserved.
      </p>
    </footer>
  );
};
