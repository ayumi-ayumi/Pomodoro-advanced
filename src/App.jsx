import { useState, useEffect, useRef } from "react";
import "./App.css";
import Calendar from "react-calendar";
import MyTimer from "./components/MyTimer";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/node_modules/react-calendar/dist/Calendar.css";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/globals.css";
import alarm from "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3";
import * as React from "react";

export default function App() {
  // const [value, setValue] = useState()
  // const [date, setDate] = useState(new Date(2023, 9, 15));
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState();
  const [count, setCount] = useState(0);
  const [record, setRecord] = useState();
  const [collections, setCollections] = useState();

  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDate = date.getDate();
  const todayDdMmYyyy = "" + getDate + getMonth + getYear;

  const audio = new Audio(alarm);
  let intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setExpiryTimestamp((prev) => {
          if (prev === 0) {
            audio.play();
            clearInterval(intervalRef.current);
            // add();
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
    const CountDataOnLocalStorage = JSON.parse(
      localStorage.getItem(todayDdMmYyyy)
    );
    if (CountDataOnLocalStorage) {
      setRecord(CountDataOnLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (expiryTimestamp === 0) {
      setCount((prev) => prev + 1);
    }
  }, [expiryTimestamp]);

  useEffect(() => {
    if (expiryTimestamp === 0) {
      add();
    }
  }, [count]);

  function handleChange (event) {
    console.log(event.target.value)
    setExpiryTimestamp(prev => event.target.value * 60)
  }

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

  useEffect(() => {
    let collection = {};

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      collection[key] = JSON.parse(localStorage.getItem(key)).count;
    }
    setCollections(collection);
  }, [date]);

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

  function getFormatDate(date) {
    return `${("0" + date.getDate()).slice(-2)}${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}${date.getFullYear()}`;
  }


  return (
    <>
      <MyTimer
        expiryTimestamp={expiryTimestamp}
        count={count}
        start={start}
        stop={stop}
        reset={reset}
        record={record}
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
          for (const property in collections) {
            if (collections.hasOwnProperty(property)) {
              if (
                view === "month" &&
                record &&
                getFormatDate(date) === property
              ) {
                return <div>{collections[property]}</div>;
                // return <p>{record.count}</p>;
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
