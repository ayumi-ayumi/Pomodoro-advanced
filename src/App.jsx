import { useState, useEffect, useRef } from "react";
import "./App.css";
import Calendar from "react-calendar";
import MyTimer from "./components/MyTimer";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/node_modules/react-calendar/dist/Calendar.css";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/globals.css";
import alarm from "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3";
import * as React from "react";
// import { render } from "react-dom";

export default function App() {
  // const [value, setValue] = useState()
  // const [date, setDate] = useState(new Date(2023, 9, 10));
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState(3);
  const [count, setCount] = useState(0);
  const [recordArr, setRecordArr] = useState([])

  const getYear = date.getFullYear()
  const getMonth = date.getMonth() + 1
  const getDate = date.getDate()
  const todayDdMmYyyy = "" + getDate + getMonth + getYear 

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
    if (expiryTimestamp === 0) {
      setCount((prev) => prev + 1);
    }
  }, [expiryTimestamp]);
  
  useEffect(() => {
    if (expiryTimestamp === 0) {
      add()
    }
  }, [count]);
  // useEffect(() => {
  //   const newRecord = {
  //               // id:Math.floor(Math.random() * 1000),
  //               date: todayDdMmYyyy,
  //               count: count,
  //             }
  //   const newRecordArr = [...recordArr, newRecord];
  //   setRecordArr(newRecordArr)
  //   localStorage.setItem(todayDdMmYyyy, JSON.stringify(recordArr));
  // }, [isActive]);
  // console.log(recordArr)

  function add () {
    const newRecord = {
                id:Math.floor(Math.random() * 1000),
                date: todayDdMmYyyy,
                count: count,
              }
    const newRecordArr = [...recordArr, newRecord];
    if(count > 0) setRecordArr(newRecordArr)
    localStorage.setItem(todayDdMmYyyy, JSON.stringify(newRecordArr));
}

  useEffect(() => {
    const CountDataOnLocalStorage = JSON.parse(localStorage.getItem(todayDdMmYyyy))
    if (CountDataOnLocalStorage) {
      setRecordArr(CountDataOnLocalStorage)
    }
  },[]);

//   var obj = {
//     last : "tarou",
//     first : "yamada"
//   };
// var obj = JSON.stringify(obj);
// localStorage.setItem('apple', obj);

// useEffect(()=>{
//   var jsonObj = localStorage.getItem('apple');
// var jsObj = JSON.parse(jsonObj);
// console.log(jsObj);
// },[])
  
  // useEffect(() => {
  //     const getYear = date.getFullYear()
  //     const getMonth = date.getMonth() + 1
  //     const getDate = date.getDate()
  //     const ddmmyyyy = "" + getDate + getMonth + getYear 
  //     const newRecord = {
  //           date: ddmmyyyy,
  //           value: count,
  //         }
  //     const newRecordArr = [...recordArr, newRecord];
  //     setRecordArr(newRecordArr)
  //     console.log(recordArr)
  // }, [count]);

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


  // const month_item = 
  //   {date:20231023, plan:"work"},
  //   {date:20231017, plan:'golf'},
  //   {date:20231010, plan:'fishing'}
// console.log(recordArr)


// function getTileContent({ date, view }) {
//   if (view === 'month') {
//       // const a = month_item.map((days,plan) => {
//       //   return <p>{date}:{plan}</p>
//       // })
//       // console.log(ddmmyyyy)

//       // console.log(date)
//         // const targetDate = moment(date).format('YYYYMMDD')
//       // for (let i = 0; i < Object.keys(month_item).length; i++) {
//       //    return console.log(Object.values(month_item)[i])
//       // }
//       // console.log(Object.keys(month_item)[0])
//       //  return   month_item.value
//       //  return   month_item[targetDate].value
//     }
// }
  

  return (
    <>
      <MyTimer
        expiryTimestamp={expiryTimestamp}
        count={count}
        start={start}
        stop={stop}
        reset={reset}
        record={recordArr}
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
        tileContent={({ activeStartDate, date, view }) => 
        view === 'month' 
        && 
        date.getFullYear() ===  new Date().getFullYear() 
        &&
        date.getMonth() ===  new Date().getMonth() 
        &&
        date.getDate() ===  new Date().getDate() 
        ? 
        <p>あゆみ</p> 
        : 
        null
        }
        
      />
      {/* <div>{value}</div> */}
    </>
  );
}
