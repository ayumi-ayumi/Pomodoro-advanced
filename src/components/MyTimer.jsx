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

return (
  <div style={{textAlign: 'center'}}>
    <div style={{fontSize: '100px'}}>
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
    <div>count: {props.count}</div>
    {/* <div>{props.record}</div> */}
    {props.record.map((item)=>(
        <div key={item.id}>{item.date}: {item.count}</div>
    ))}
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