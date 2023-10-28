import React, { useRef, useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
// import 'react-calendar/dist/Calendar.css'
import alarm from '/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3'


export default function MyTimer (props) {

  let expiryTimestamp = props.expiryTimestamp
  let m = expiryTimestamp / 60;
  let s = expiryTimestamp % 60;
  let minutes = Math.floor(m)
  let seconds = ("0" + s).slice(-2) 

  // const [timerMins, setTimerMins] = useState()

  // const lastElement = props.record.slice(-1)

  // function handleChange (event) {
  //   console.log(event.target.value)
  //   setTimerMins(prev => event.target.value)
  // }
  console.log(props.expiryTimestamp)

return (
  <div style={{textAlign: 'center'}}>
    <div>
      <input type='number' max={60} step={5} onChange={props.handleChange} />Minutes
    </div>
    <div style={{fontSize: '100px'}}>
      <span>{props.expiryTimestamp && minutes}</span>:<span>{props.expiryTimestamp && seconds}</span>
      {/* <span>{minutes}</span>:<span>{seconds}</span> */}
    </div>
    {props.record && <div>count: {props.record.count}</div>}
    {props.record && <div>{props.record.recordDate}</div>}
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
      {/* <button onClick={props.stopAudio}>audio stop</button> */}
      {/* <button onClick={props.playAudio}>audio play</button> */}
      </div>
    </div>
  )
}