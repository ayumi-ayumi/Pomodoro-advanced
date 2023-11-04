import { useState, useEffect, useRef } from "react";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/App.css";
import Calendar from "react-calendar";
import MyTimer from "./components/MyTimer";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/node_modules/react-calendar/dist/Calendar.css";
// import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/globals.css";
import alarm from "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3";
import * as React from "react";

export default function App() {
  // const [value, setValue] = useState()
  // const [date, setDate] = useState(new Date(2023, 8, 10)); //demo
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState(0);
  const [timeLeft, setTimeLeft] = useState();
  // const [timeLeft, setTimeLeft] = useState(1);
  // const [count, setCount] = useState(0);
  const [record, setRecord] = useState();
  const [collections, setCollections] = useState();
  const [totalSeconds, setTotalSeconds] = useState(0);

  
  const todayDdMmYyyy =
  "" + date.getDate() + (date.getMonth() + 1) + date.getFullYear();
  const audio = new Audio(alarm);
  
  let intervalRef = useRef(null);
  let totalSecondsToHours = Math.floor(totalSeconds / 3600)
  let totalSecondsToMinutes = ("0" + (totalSeconds % 3600) / 60).slice(-2);

  useEffect(() => {
    const totalSecondsDataOnLocalStorage = JSON.parse(
      localStorage.getItem(todayDdMmYyyy)
    );
    if (totalSecondsDataOnLocalStorage) {
      setRecord(totalSecondsDataOnLocalStorage);
      // setCount(countDataOnLocalStorage.count);
    }
  }, []);

  useEffect(() => {
    if (record) {
      if (record.totalSeconds) setTotalSeconds(record.totalSeconds);
    }
  }, [record]);
  // useEffect(() => {
  //   const countDataOnLocalStorage = JSON.parse(
  //     localStorage.getItem(todayDdMmYyyy)
  //   );
  //   if (countDataOnLocalStorage) {
  //     setRecord(countDataOnLocalStorage);
  //     // setCount(countDataOnLocalStorage.count);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (record) {
  //     if (record.count) setCount(record.count);
  //   }
  // }, [record]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
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

  // When time is up, add set expiry time stamp to the total seconds
  useEffect(() => {
    if (timeLeft === 0) {
      // add();
      setTotalSeconds((prev) => prev + expiryTimestamp);
      // setTotalSecondsToHours(("0" + (Math.floor(totalSeconds / 3600))).slice(-2));
      // setTotalSecondsToMinutes(("0" +(totalSeconds % 3600) / 60).slice(-2));
    }
  }, [timeLeft]);
  // }, [count]);

  useEffect(() => {
    if (timeLeft === 0) {
      add();
    }
  }, [totalSeconds]);
  // }, [count]);
  // }, [timeLeft]);

  //Store in the local storage
  function add() {
    const newRecord = {
      id: todayDdMmYyyy,
      recordDate: todayDdMmYyyy,
      totalSeconds: totalSeconds,
    };
    if (totalSeconds > 0) setRecord(newRecord);
    localStorage.setItem(todayDdMmYyyy, JSON.stringify(newRecord));
  }

  //Make an object of each date and count number {date: count number}
  useEffect(() => {
    let collection = {};
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      collection[key] = JSON.parse(localStorage.getItem(key)).totalSeconds;
    }
    setCollections(collection);
  }, [totalSeconds]);
  // }, [count]);

  function stop() {
    clearInterval(intervalRef.current);
    setIsActive(false);
    audio.pause();
  }

  function start() {
    if (expiryTimestamp) setIsActive(true);
  }

  function reset() {
    setTimeLeft(expiryTimestamp);
    clearInterval(intervalRef.current);
    setIsActive(false);
    audio.pause();
  }

  function getFormatDate(date) {
    return `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
  }

  function handleChange(event) {
    // setExpiryTimestamp(event.target.value * 1500);//demo
    setExpiryTimestamp(event.target.value * 60); //本番用
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
        // collection={collection}
      />
      <Calendar
        onChange={(date) => setDate(date)}
        value={date}
        // showWeekNumbers={true}
        // tileContent={({ date, view }) => (
        //   <div className="custom-date-style">{count}</div>
        // )}
        // tileContent={({ activeStartDate, date, view }) => view === 'month' && date.getDate() ===  new Date().getDate()? <p>Today</p> : null}
        // tileContent = {getTileContent}

        tileContent={({ activeStartDate, date, view }) => {
          // property is shown a date as 10102023
          for (const property in collections) {
            if (collections.hasOwnProperty(property)) {
              if (
                view === "month" &&
                record &&
                getFormatDate(date) === property
              ) {
                let hours = Math.floor(collections[property] / 3600);
                let mins = ("0" + (collections[property] % 3600) / 60).slice(
                  -2
                );
                return (
                  <div>
                    {hours}H {mins}
                  </div>
                );
              }
              <p>error</p>;
            }
          }
        }}
      />
      {/* <div>{value}</div> */}
    </>
  );
}
