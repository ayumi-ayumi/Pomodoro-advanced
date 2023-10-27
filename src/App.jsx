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
  // const [date, setDate] = useState(new Date(2023, 9, 15));
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState(3);
  const [count, setCount] = useState(0);
  // const [count, setCount] = useState(0);
  const [record, setRecord] = useState();
  // const [collection, setCollection] = useState()

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
  // useEffect(() => {
  //   const newRecord = {
  //               // id:Math.floor(Math.random() * 1000),
  //               date: todayDdMmYyyy,
  //               count: count,
  //             }
  //   const newRecordArr = [...record, newRecord];
  //   setRecord(newRecordArr)
  //   localStorage.setItem(todayDdMmYyyy, JSON.stringify(record));
  // }, [isActive]);
  // console.log(record)

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
  //   function add () {
  //     const newRecord = {
  //                 id:Math.floor(Math.random() * 1000),
  //                 date: todayDdMmYyyy,
  //                 count: count,
  //               }
  //     const newRecordArr = [...record, newRecord];
  //     if(count > 0) setRecord(newRecordArr)
  //     localStorage.setItem(todayDdMmYyyy, JSON.stringify(newRecordArr));
  // }

  // const aa = JSON.parse(localStorage.getItem(24102023))
  // console.log(aa)

  // Object.keys(localStorage).forEach(function(key) { console.log(key); });

  let collection = {};

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    collection[key] = JSON.parse(localStorage.getItem(key)).count;
  }

  // console.log(typeof(obj[10102023]))

  // useEffect(() => {
  //   setCollection(()=>Object.keys(localStorage).map(key => {

  //     return {
  //         key: key,
  //         value: localStorage.getItem(key)
  //     }

  //   }))
  // },[])

  // const collection = Object.keys(localStorage).map(key => {
  //   return {
  //       key: key,
  //       value: JSON.parse(localStorage.getItem(key))
  //   }
  // });

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
  //     const newRecordArr = [...record, newRecord];
  //     setRecord(newRecordArr)
  //     console.log(record)
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
  // console.log(record)

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

  function getFormatDate(date) {
    return `${("0" + date.getDate()).slice(-2)}${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}${date.getFullYear()}`;
  }

  // function getTileContent({ date, view }) {
  //   // 月表示のときのみ
  //   if (view !== 'month') {
  //     return null;
  //   }
  //   const day = getFormatDate(date);
  //   return (
  //     <p>
  //       <br />
  //       {(this.state.month_days[day] && this.state.month_days[day].text) ?
  //         this.state.month_days[day].text : ' '
  //       }
  //     </p>
  //   );
  // }
  // console.log(collection)
  let dayArr = [];
  // for (let i = 0; i < collection.length; i++) {
  //   dayArr.push(collection[i].key)
  // }
  for (const property in collection) {
    if (collection.hasOwnProperty(property)) {
      // console.log(collection[property])
      console.log(property);
      // console.log(`${property}: ${collection[property]}`);
    }
  }
  console.log(dayArr);
  // for (const property in collection) {
  //   if( collection.hasOwnProperty(property) ) {
  //     dayArr.push({property:collection[property]})
  //     // console.log(`${property}: ${collection[property]}`);
  //   }}
  //   console.log(dayArr)

  // console.log(collection.length)

  // console.log(collection)

  return (
    <>
      <MyTimer
        expiryTimestamp={expiryTimestamp}
        count={count}
        start={start}
        stop={stop}
        reset={reset}
        record={record}
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
          for (const property in collection) {
            if (collection.hasOwnProperty(property)) {
              if (
                view === "month" &&
                record &&
                getFormatDate(date) === property
              ) {
                return <p>{collection[property]}</p>;
                // return <p>{record.count}</p>;
              }
              <p>error</p>;
            }
          }
        }}
        // {for (let i = 0; i < dayArr.length; i++) {
        //   if(view === 'month' && record && getFormatDate(date) === dayArr[i]) {
        //     return <p>{record.count}</p>
        //   }
        //     <p>error</p>
        // }}
        // }

        // tileContent={({ activeStartDate, date, view }) =>
        // view === 'month'
        // &&
        // record
        // // getFormatDate(activeStartDate) === record.date
        // // getFormatDate(date) === todayDdMmYyyy
        // &&
        // getFormatDate(date) === record.recordDate
        // // date.getFullYear() ===  new Date().getFullYear()
        // // &&
        // // date.getMonth() ===  new Date().getMonth()
        // // &&
        // // date.getDate() ===  new Date().getDate()
        // ?
        // <p>{record.count}</p>
        // :
        // <p>{getFormatDate(date)}</p>
        // // null
        // }

        // tileContent={({ activeStartDate, date, view }) =>
        // view === 'month'
        // &&
        // date.getFullYear() ===  new Date().getFullYear()
        // &&
        // date.getMonth() ===  new Date().getMonth()
        // &&
        // date.getDate() ===  new Date().getDate()
        // ?
        // <p>{count}</p>
        // :
        // null
        // }
      />
      {/* <div>{value}</div> */}
    </>
  );
}
