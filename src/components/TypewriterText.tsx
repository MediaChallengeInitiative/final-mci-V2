"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
  infinite?: boolean;
  startDelay?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 100,
  className = "",
  onComplete,
  cursor = true,
  infinite = false,
  startDelay = 0
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoize text array for performance
  const textArray = useMemo(() => Array.from(text), [text]);

  // Reset function for infinite mode
  const resetAnimation = useCallback(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsTyping(true);
  }, []);

  // Type one character
  const typeCharacter = useCallback(() => {
    if (currentIndex < textArray.length) {
      setDisplayText((prev) => prev + textArray[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsTyping(false);
      onComplete?.();

      if (infinite) {
        setTimeout(() => {
          resetAnimation();
        }, 2000); // Pause before restarting
      }
    }
  }, [currentIndex, textArray, onComplete, infinite, resetAnimation]);

  // Main typing effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isTyping && currentIndex === 0) {
      // Initial start with optional delay
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);
    } else if (isTyping) {
      timeout = setTimeout(typeCharacter, delay);
    }

    return () => clearTimeout(timeout);
  }, [isTyping, currentIndex, delay, startDelay, typeCharacter]);

  // Cursor style
  const cursorStyle = useMemo(
    () => ({
      borderRight: cursor ? "2px solid currentColor" : "none",
      animation: cursor ? "blink 1s step-end infinite" : "none",
      paddingRight: cursor ? "2px" : "0"
    }),
    [cursor]
  );

  return (
    <span
      className={`inline-block ${className}`}
      style={cursorStyle}
      aria-label={text}
    >
      {displayText}
      <style jsx global>{`
        @keyframes blink {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: currentColor;
          }
        }
      `}</style>
    </span>
  );
};

export default TypewriterText;

// "use client"

// import React, { useEffect, useState } from "react";

// interface TypewriterTextProps {
//   text: string;
//   delay?: number;
//   className?: string;
// }

// export const TypewriterText: React.FC<TypewriterTextProps> = ({
//   text,
//   delay = 100,
//   className = ""
// }) => {
//   const [currentText, setCurrentText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setCurrentText((prev) => prev + text[currentIndex]);
//         setCurrentIndex((prev) => prev + 1);
//       }, delay);

//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, delay, text]);

//   return <span className={className}>{currentText}</span>;
// };
