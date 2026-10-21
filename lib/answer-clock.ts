"use client";

import { useEffect, useRef } from "react";

/**
 * How long the reader took to answer, for the answer history: the clock starts when `question` changes (a new card
 * on screen), and `ms()` reads it. `restart()` starts it again, for a quiz question that waits until the first
 * keystroke.
 */
export function useAnswerClock(question: unknown) {
  const start = useRef(0);
  useEffect(() => {
    start.current = Date.now();
  }, [question]);
  return {
    ms: () => (start.current ? Date.now() - start.current : undefined),
    restart: () => {
      start.current = Date.now();
    },
  };
}
