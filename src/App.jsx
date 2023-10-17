import { useState, useEffect, useRef } from "react";
import "./App.css";
import Calendar from "react-calendar";
import MyTimer from "./components/MyTimer";
import "react-calendar/dist/Calendar.css";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/globals.css";
import alarm from "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3";
import * as React from "react";
// import { render } from "react-dom";

export default function App() {
  // const [value, setValue] = useState()
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState(3);
  const [count, setCount] = useState(0);
  const [plan, setPlan] = useState();
  const audio = new Audio(alarm);
  let intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setExpiryTimestamp((prev) => {
          if (prev === 0) {
            audio.play();
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  useEffect(() => {
    if (expiryTimestamp === 0) {
      setCount((prev) => prev + 1);
    }
  }, [expiryTimestamp]);

  function stop() {
    clearInterval(intervalRef.current);
    setIsActive((prev) => !prev);
    audio.pause();
  }

  function start() {
    setIsActive((prev) => !prev);
  }

  function reset() {
    setExpiryTimestamp(3);
  }

  return (
    <>
      <MyTimer
        expiryTimestamp={expiryTimestamp}
        count={count}
        start={start}
        stop={stop}
        reset={reset}
      />
      <Calendar
        onChange={(date) => setDate(date)}
        value={date}
        tileContent={({ date, view }) => (
          <div className="custom-date-style">{count}</div>
        )}
      />
      {/* <div>{value}</div> */}
    </>
  );
}
