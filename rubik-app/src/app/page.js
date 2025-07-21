"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const startStopTimer = () => {
    if (!isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      setIsRunning(true);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;

      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    setSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-amber-300 text-center">
        Site Chrono Rubik's Cube
      </h1>

      <div className="text-center text-8xl p-90 ">{formatTime(seconds)}</div>

      <div className="flex justify-center space-x-6 mt-6">
        <div className="border-2 text-5xl justify-center flex w-86 bg-green-700 rounded">
          <button onClick={startStopTimer}>
            {" "}
            {isRunning ? "Stop" : "Démarrer"}
          </button>
        </div>
        <div className="	bg-red-700 border-2 text-5xl justify-center flex w-86 text-white rounded">
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}
