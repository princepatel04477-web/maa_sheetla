"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  sequential?: boolean;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—✳";

export default function DecryptedText({
  text,
  speed = 35,
  maxIterations = 8,
  className = "",
  sequential = false,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (sequential && index < iteration / 2) return text[index];
            if (iteration >= maxIterations) return text[index];
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
      }
      iteration += 1;
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed, maxIterations, sequential, isHovered]);

  return (
    <span
      onMouseEnter={() => setIsHovered(!isHovered)}
      className={`font-mono ${className}`}
    >
      {displayText}
    </span>
  );
}
