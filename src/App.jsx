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
  // const [date, setDate] = useState(new Date(2023, 9, 15));
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState();
  // const [timeLeft, setTimeLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState(expiryTimestamp * 60);
  const [count, setCount] = useState(0);
  const [record, setRecord] = useState();
  const [collections, setCollections] = useState();
  // const [totalSecondsArr, setTotalSecondsArr] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const todayDdMmYyyy =
    "" + date.getDate() + (date.getMonth() + 1) + date.getFullYear();
  const audio = new Audio(alarm);

  let intervalRef = useRef(null);

  useEffect(() => {
    if (record) {
      if (record.count) setCount(record.count);
    }
  }, [isActive]);

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

  useEffect(() => {
    if (timeLeft === 0) {
      setCount((prev) => prev + 1);
      // setTotalSeconds((prev) => prev + expiryTimestamp);

    }
  }, [timeLeft]);
  // useEffect(() => {
  //   if (timeLeft === 0)
  //   setCount((prev) => prev + 1);
  // }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      add();
      setTotalSeconds((prev) => prev + expiryTimestamp);
    }
  }, [count]);

  useEffect(() => {
    const countDataOnLocalStorage = JSON.parse(
      localStorage.getItem(todayDdMmYyyy)
    );
    if (countDataOnLocalStorage) {
      setRecord(countDataOnLocalStorage);
    }
  }, []);

  // useEffect(() => {
  //   if (timeLeft > 0) setTotalSecondsArr(prev => prev + timeLeft)
  // }, [timeLeft])

  //Store in the local storage
  function add() {
    const newRecord = {
      id: Math.floor(Math.random() * 1000),
      recordDate: todayDdMmYyyy,
      count: count,
    };
    // const newRecordArr = [...record, newRecord];
    if (count > 0) setRecord(newRecord);
    localStorage.setItem(todayDdMmYyyy, JSON.stringify(newRecord));
  }

  //make object of each date and count number {date: count number}
  useEffect(() => {
    let collection = {};
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      collection[key] = JSON.parse(localStorage.getItem(key)).count;
    }
    setCollections(collection);
  }, [count]);

  function stop() {
    clearInterval(intervalRef.current);
    setIsActive(false);
    audio.pause();
  }

  function start() {
    setIsActive(true);
    // setTotalSecondsArr([...totalSecondsArr, expiryTimestamp])
  }

  function reset() {
    setTimeLeft(expiryTimestamp);
    clearInterval(intervalRef.current);
    setIsActive(false);
    audio.pause();
  }

  function getFormatDate(date) {
    return `${("0" + date.getDate()).slice(-2)}${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}${date.getFullYear()}`;
  }

  function handleChange(event) {
    setExpiryTimestamp((prev) => parseInt(event.target.value));
    // setTimeLeft(expiryTimestamp * 60);
    setTimeLeft((prev) => event.target.value * 60);
    // setTimeLeft(prev => event.target.value * 60);
    // setTotalSecondsArr([...event.target.value])
  }

  return (
    <>
      <MyTimer
        timeLeft={timeLeft}
        count={count}
        start={start}
        stop={stop}
        reset={reset}
        record={record}
        isActive={isActive}
        totalSeconds={totalSeconds}
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
          // property is date as 10102023
          for (const property in collections) {
            if (collections.hasOwnProperty(property)) {
              if (
                view === "month" &&
                record &&
                getFormatDate(date) === property
              ) {
                return <div>{collections[property]}</div>;
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
