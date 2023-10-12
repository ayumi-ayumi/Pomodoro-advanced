import React, { useRef, useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import 'react-calendar/dist/Calendar.css'
import alarm from '/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3'


export default function MyTimer (props) {
// let timerMins = document.getElementById('setTimerMins')
// let startButton = document.getElementById('startButton')
// let stopButton = document.getElementById('stopButton')
// let resetButton = document.getElementById('resetButton')
// let showTimer = document.getElementById('showTimer')
// let countdownSeconds = document.getElementById('countdownSeconds')
// let times = document.getElementById('times')
// let recordMins = document.getElementById('recordMins')
// let totalMins = document.getElementById('totalMins')
// let audio = document.getElementById('audio')

// let timerID;
// // let expiryTimestamp = props.expiryTimestamp;
// // let minutes = expiryTimestamp / 60;
// // let seconds = expiryTimestamp % 60;
// let count = 0;

// const audio = new Audio(alarm);

// // const [minutes, setMinutes] = useState(expiryTimestamp / 60)
// // const [seconds, setSeconds] = useState(expiryTimestamp % 60)

// // let m = expiryTimestamp / 60;
// // let s = expiryTimestamp % 60;
// // let minutes = ("0" + m).slice(-2) 
// // let seconds = ("0" + s).slice(-2) 
// let m = 0
// let s = 0
// let minutes = ""
// let seconds = " "




// // const [expiryTimestamp, setExpiryTimestamp ] = useState(props.expiryTimestamp)

// function countDown() {
// console.log(props.expiryTimestamp)

// if (props.expiryTimestamp === 0 ) {
//   // count ++;
//   // times.innerHTML = count + "   *"; 
//   stop()
//   playAudio();
//   // expiryTimestamp = props.expiryTimestamp
//   // recordMins.innerHTML = expiryTimestamp/60 + " mins"
//   // let totalRecordMins = count * 15

//   // if (totalRecordMins < 60) {
//   //   totalMins.innerHTML = "Total " + totalRecordMins + " mins"
//   // } else {
//   //   let RecordHours = Math.floor(totalRecordMins / 60)
//   //   let RecordRestMins = totalRecordMins % 60 
//   //   totalMins.innerHTML = "Total " + RecordHours + " hours" + RecordRestMins + " mins"
//   // }
// }
// // let m = expiryTimestamp / 60;
// // let s = expiryTimestamp % 60;
// // let minutes = ("0" + m).slice(-2) 
// // let seconds = ("0" + s).slice(-2) 
// // let m = expiryTimestamp / 60;
// // let s = expiryTimestamp % 60;
// // let minutes = ("0" + m).slice(-2) 
// // let seconds = ("0" + s).slice(-2) 
// // minutes = expiryTimestamp / 60
// // seconds = expiryTimestamp % 60
// // seconds = ("0" + s).slice(-2)
// // seconds = "0" + (expiryTimestamp % 60).slice(-2)
// // showTimer.innerHTML = ("0" + minutes).slice(-2) +"：" + ("0" + seconds).slice(-2);
// // expiryTimestamp --;
// // setExpiryTimestamp(expiryTimestamp - 1)

// // const decreaseTime = () => setExpiryTimestamp((prev) => prev - 1)

// useEffect(() => {
//   setInterval(()=>{
//     props.setExpiryTimestamp(props.expiryTimestamp - 1)
//     console.log(props.expiryTimestamp)

//   }, 1000);
  
// }, []);

// // console.log(expiryTimestamp)
// // React.useEffect(function() {
// //   setExpiryTimestamp(expiryTimestamp - 1)
// // }, [expiryTimestamp])


// // useEffect(() => {
// //   const countDownInterval = setInterval(() => {
// //     if (countTime === 0) {
// //       clearInterval(countDownInterval)
// //     }
// //     if (countTime && countTime > 0) {
// //       setCountTime(countTime - 1)
// //     }
// //   }, 1000)
// //   return () => {
// //     clearInterval(countDownInterval)
// //   }
// // }, [countTime])

// }

// function start() {
// // timerID = setInterval(() => countDown(), 1000);
// // useEffect(function(){
// //   timerID = setInterval(countDown, 1000);

// // }) 
// console.log(123)
// timerID = countDown()
// }

// function stop () {
// stopAudio();
// clearInterval(timerID);
// timerID = null;
// }

// function reset() {
// // expiryTimestamp = props.expiryTimestamp;
// minutes = expiryTimestamp / 60
// seconds = expiryTimestamp % 60
// // showTimer.innerHTML = ("0" + minutes).slice(-2) +"：" + ("0" + seconds).slice(-2);
// }

// function playAudio(){
// audio.play();
// }

// function stopAudio(){
// audio.pause();
// }

// startButton.addEventListener('click', start)
// stopButton.addEventListener('click', stop)
// resetButton.addEventListener('click', reset)

return (
  <div style={{textAlign: 'center'}}>
    <div style={{fontSize: '100px'}}>
      <span>{props.minutes}</span>:<span>{props.seconds}</span>
      <br />
      <span>{props.expiryTimestamp}</span>
      {/* <span>{displayMinutes}</span>:<span>{displaySeconds}</span> */}
      <br />
    </div>
    <div className="buttons">
      <button onClick={props.start}>START</button>
      <button onClick={props.stop}>STOP</button>
      <button onClick={props.reset}>RESET</button>
      </div>
    </div>
  )
}