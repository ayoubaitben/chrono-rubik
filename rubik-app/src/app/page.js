"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const [history, setHistory] = useState([]);

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const saveCurrentTime = () => {
    if (seconds > 0) {
      setHistory((prev) => [...prev, seconds]);
      setSeconds(0);
    }
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

      <div className="text-center text-8xl m-42  ">{formatTime(seconds)}</div>
      <div className=" w-fit bg-gray-800 p-4 rounded shadow-md ">
        <h2 className="text-xl text-white mb-2 ">Historique des temps :</h2>
        <ul className="space-y-2 text-white text-lg ">
          {history.map((time, index) => (
            <li key={index}>
              {index + 1}. {formatTime(time)}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-6 mt-6 w-fit mx-auto ">
        <div className="text-5xl justify-center flex w-86 bg-green-700 rounded">
          <button onClick={startStopTimer}>
            {" "}
            {isRunning ? "Stop" : "Démarrer"}
          </button>
        </div>
        <div className="	bg-red-700  text-5xl justify-center flex w-86 text-white rounded ">
          <button onClick={resetTimer}>Reset</button>
        </div>
        <div className="bg-blue-700 text-5xl justify-center flex w-86 text-white rounded">
          <button onClick={saveCurrentTime}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
