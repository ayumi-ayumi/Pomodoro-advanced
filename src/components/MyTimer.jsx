import React, { useRef, useState, useEffect } from "react";
import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/MyTimer.css";

export default function MyTimer(props) {
  let timeLeft = props.timeLeft;
  let m = timeLeft / 60;
  let s = timeLeft % 60;
  let minutes = ("0" + (Math.floor(m))).slice(-2);
  let seconds = ("0" + s).slice(-2);

  // const [timerMins, setTimerMins] = useState()

  // const lastElement = props.record.slice(-1)

  // function handleChange (event) {
  //   console.log(event.target.value)
  //   setTimerMins(prev => event.target.value)
  // }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="settingTimer">
        <input
          type="number"
          // min={5}
          max={60}
          // step={5}
          // value={15}
          onChange={props.handleChange}
        />
        Minutes
      </div>
      <div className="timeLeft">
       {props.timeLeft ? <span>{minutes}</span> : <span>00</span>}:
       {props.timeLeft ? <span>{seconds}</span> : <span>00</span>}
      </div>
      {props.totalSeconds &&<div>{props.totalSeconds}</div> }
      {<div>{props.isActive ? "active": "no active"}</div>}
      {/* {lastElement.map((el)=>(
    <div>count:{el.count}</div>
    ))} */}
      {/* {props.record && props.record.map((item)=>(
        <div key={item.id}>{item.date}: {item.count}</div>
    ))} */}
      <div className="buttons">
        <button onClick={props.start}>START</button>
        <button onClick={props.stop}>STOP</button>
        <button onClick={props.reset}>RESET</button>
      </div>
    </div>
  );
}
