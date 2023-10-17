import { useState, useEffect, useRef } from 'react'
import './App.css'
import Calendar from 'react-calendar'
import MyTimer from './components/MyTimer'
// import 'react-calendar/dist/Calendar.css'
import alarm from '/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3'
import * as React from "react";
import { render } from "react-dom";

export default function App() {
    const [value, setValue] = useState()
    const [isActive, setIsActive] = useState(false);
    const [expiryTimestamp, setExpiryTimestamp] = useState(3);
    const audio = new Audio(alarm);
    let intervalRef = useRef(null);

    useEffect(() => {
      if(isActive){
        intervalRef.current = setInterval(() => {
          setExpiryTimestamp((expiryTimestamp) =>{ 
          if(expiryTimestamp === 0) {
            audio.play()
            clearInterval(intervalRef.current);
            return 0
        }
          return expiryTimestamp - 1}
          )}, 1000);
      }
      return () => {
        clearInterval(intervalRef.current);
      };
    });

    function stop() {
      clearInterval(intervalRef.current);
      setIsActive(prev => !prev);
      audio.pause()
    }

    function start() {
      setIsActive(prev => !prev);
    }

    function reset() {
      setExpiryTimestamp(3)
    }
    return (

      <>
      <MyTimer 
      expiryTimestamp={expiryTimestamp} 
      start={start}
      stop={stop}
      reset={reset}
      />
      <Calendar 
      value={value}
      onClickDay={(e) => setValue(e)}

        />
      {/* <div>{value}</div> */}
    </>


);
}
{/* <div>
  expiryTimestamp: {expiryTimestamp}
  <br />
  <button onClick={start}> Start </button>
  <button onClick={stop}> Stop </button>
  <button onClick={reset}> Reset </button>
  <button onClick={()=>{
    setIsActive(true);
  }}> Start </button>
</div>  */}