import { useState, useEffect, useRef } from "react";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/App.css";
import Calendar from "react-calendar";
import MyTimer from "./components/MyTimer";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/Calendar.css";
import alarm from "../assets/alarm.mp3";
import * as React from "react";

// const timerWorker = new Worker("/pomodoro-timer-record/src/worker.jsx");
// console.log(timerWorker)
const audio = new Audio(alarm);

export default function App() {
  // const [date, setDate] = useState(new Date(2023, 10, 9)); //demo
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState(0);
  const [timeLeft, setTimeLeft] = useState();
  const [record, setRecord] = useState();
  const [collections, setCollections] = useState();
  const [totalSeconds, setTotalSeconds] = useState(0);
  // const [timerWorker, setTimerWorker] = useState();
  const workerRef = useRef(null);

  const todayDdMmYyyy =
    "" + date.getDate() + (date.getMonth() + 1) + date.getFullYear();

  let totalSecondsToHours = Math.floor(totalSeconds / 3600);
  let totalSecondsToMinutes = ("0" + (totalSeconds % 3600) / 60).slice(-2);

  useEffect(() => {
    // const timerWorker = new Worker("/pomodoro-timer-record/src/worker.jsx");
    // setTimerWorker(new Worker("/pomodoro-timer-record/src/worker.jsx"))
    workerRef.current = new Worker("/pomodoro-timer-record/src/worker.jsx")
    workerRef.current.onmessage = (e) => {
      setTimeLeft(e.data.time);
    };
    return () => {
      workerRef.current.terminate(); // Clean up on component unmount
    }
  }, []);

  useEffect(() => {
    const totalSecondsDataOnLocalStorage = JSON.parse(
      localStorage.getItem(todayDdMmYyyy)
    );
    if (totalSecondsDataOnLocalStorage) {
      setRecord(totalSecondsDataOnLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (record) {
      if (record.totalSeconds) setTotalSeconds(record.totalSeconds);
    }
  }, [record]);

  // useEffect(() => {
  //   workerRef.onmessage = (e) => {
  //     setTimeLeft(e.data.time);
  //   };
  // }, [workerRef]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
      workerRef.current.postMessage({ isActive: false, expiryTimestamp: 0 });
    }
  }, [timeLeft]);

  // When time is up, add the expiry time stamp to the total seconds
  useEffect(() => {
    if (timeLeft === 0) {
      setTotalSeconds((prev) => prev + expiryTimestamp);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      audio.play();
      add();
    }
  }, [totalSeconds]);

  //Store in the local storage
  function add() {
    const newRecord = {
      id: todayDdMmYyyy,
      recordDate: todayDdMmYyyy,
      totalSeconds: totalSeconds,
    };
    if (totalSeconds > 0) setRecord(newRecord);
    localStorage.setItem(todayDdMmYyyy, JSON.stringify(newRecord)); // using useEffect is also worked
  }

  //Make an object of each date and count number {date: count number}
  useEffect(() => {
    let collectionArr = {};
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      collectionArr[key] = JSON.parse(localStorage.getItem(key)).totalSeconds;
    }
    setCollections(collectionArr);
  }, [totalSeconds]);

  function stop() {
    setIsActive(false);
    workerRef.current.postMessage({ isActive: false, expiryTimestamp: timeLeft });
    audio.pause();
  }

  function start() {
    if (expiryTimestamp) {
      setIsActive(true);
      if (expiryTimestamp !== timeLeft) {
        workerRef.current.postMessage({ isActive: true, expiryTimestamp: timeLeft });
      } else {
        workerRef.current.postMessage({
          isActive: true,
          expiryTimestamp: expiryTimestamp,
        });
      }
    }
  }

  function reset() {
    setTimeLeft(expiryTimestamp);
    setIsActive(false);
    audio.pause();
  }

  function getFormatDate(date) {
    return `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
  }

  function handleChange(event) {
    // setExpiryTimestamp(event.target.value * 1500);//demo
    setExpiryTimestamp(event.target.value * 60); //本番用
    workerRef.current.postMessage({
      isActive: false,
      expiryTimestamp: event.target.value * 60,
    });

    // setTimeLeft((prev) => event.target.value); // as seconds, demo
    setTimeLeft((prev) => event.target.value * 60); //本番用
  }

  return (
    <>
      <MyTimer
        timeLeft={timeLeft}
        start={start}
        stop={stop}
        reset={reset}
        record={record}
        isActive={isActive}
        totalSeconds={totalSeconds}
        totalSecondsToHours={totalSecondsToHours}
        totalSecondsToMinutes={totalSecondsToMinutes}
        expiryTimestamp={expiryTimestamp}
        handleChange={handleChange}
      />
      <Calendar
        onChange={(date) => setDate(date)}
        value={date}
        showWeekNumbers={true}
        tileContent={({ activeStartDate, date, view }) => {
          // property is shown a date as 10102023
          for (const property in collections) {
            if (collections.hasOwnProperty(property)) {
              if (
                view === "month" &&
                // record &&
                getFormatDate(date) === property
              ) {
                let hours = Math.floor(collections[property] / 3600);
                let mins = ("0" + (collections[property] % 3600) / 60).slice(
                  -2
                );
                return (
                  <div className="totalHoursOnCalendar">
                    {hours} hr {mins} min
                  </div>
                );
              }
              <p>error</p>;
            }
          }
        }}
      />
    </>
  );
}
