import { useState, useEffect, useRef } from 'react'
import './App.css'
import Calendar from 'react-calendar'
import MyTimer from './components/MyTimer'
// import 'react-calendar/dist/Calendar.css'

function App() {
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + 4); 

  const [value, setValue] = useState()
  const [expiryTimestamp, setExpiryTimestamp ] = useState(900)

  let intervalRef = useRef();

let timerID;
// let expiryTimestamp = props.expiryTimestamp;
// let minutes = expiryTimestamp / 60;
// let seconds = expiryTimestamp % 60;
let count = 0;

// const audio = new Audio(alarm);

// const [minutes, setMinutes] = useState(expiryTimestamp / 60)
// const [seconds, setSeconds] = useState(expiryTimestamp % 60)

let m = expiryTimestamp / 60;
let s = expiryTimestamp % 60;
let minutes = ("0" + m).slice(-2) 
let seconds = ("0" + s).slice(-2) 
// let m = 0
// let s = 0
// let minutes = ""
// let seconds = " "




// const [expiryTimestamp, setExpiryTimestamp ] = useState(props.expiryTimestamp)

function countDown() {

if (expiryTimestamp === 0 ) {
  // count ++;
  // times.innerHTML = count + "   *"; 

  stop()
  // playAudio();

  // expiryTimestamp = props.expiryTimestamp
  // recordMins.innerHTML = expiryTimestamp/60 + " mins"
  // let totalRecordMins = count * 15

  // if (totalRecordMins < 60) {
  //   totalMins.innerHTML = "Total " + totalRecordMins + " mins"
  // } else {
  //   let RecordHours = Math.floor(totalRecordMins / 60)
  //   let RecordRestMins = totalRecordMins % 60 
  //   totalMins.innerHTML = "Total " + RecordHours + " hours" + RecordRestMins + " mins"
  // }
}
// let m = expiryTimestamp / 60;
// let s = expiryTimestamp % 60;
// let minutes = ("0" + m).slice(-2) 
// let seconds = ("0" + s).slice(-2) 
// let m = expiryTimestamp / 60;
// let s = expiryTimestamp % 60;
// let minutes = ("0" + m).slice(-2) 
// let seconds = ("0" + s).slice(-2) 
// minutes = expiryTimestamp / 60
// seconds = expiryTimestamp % 60
// seconds = ("0" + s).slice(-2)
// seconds = "0" + (expiryTimestamp % 60).slice(-2)
// showTimer.innerHTML = ("0" + minutes).slice(-2) +"：" + ("0" + seconds).slice(-2);
// expiryTimestamp --;
console.log(expiryTimestamp)
// setExpiryTimestamp(expiryTimestamp - 1)

intervalRef.current = setInterval(()=>{
      setExpiryTimestamp(prev => prev - 1)
  
    }, 1000);
console.log(timerID)



// const decreaseTime = () => setExpiryTimestamp((prev) => prev - 1)

// useEffect(() => {
//   setInterval(()=>{
//     setExpiryTimestamp(prev => prev - 1)

//   }, 1000);
  
// }, []);

// console.log(expiryTimestamp)
// React.useEffect(function() {
//   setExpiryTimestamp(expiryTimestamp - 1)
// }, [expiryTimestamp])


// useEffect(() => {
//   const countDownInterval = setInterval(() => {
//     if (countTime === 0) {
//       clearInterval(countDownInterval)
//     }
//     if (countTime && countTime > 0) {
//       setCountTime(countTime - 1)
//     }
//   }, 1000)
//   return () => {
//     clearInterval(countDownInterval)
//   }
// }, [countTime])

}

function start() {
// timerID = setInterval(() => countDown(), 1000);
// useEffect(function(){
//   timerID = setInterval(countDown, 1000);

// }) 
// timerID = setInterval(countDown,1000);

console.log(123)
countDown()
// setInterval(() => countDown(), 1000);
// setInterval(countDown(), 1000);
// timerID = countDown()
}

function stop () {
// stopAudio();
console.log(timerID)

// clearInterval(timerID);
clearInterval(intervalRef.current);
timerID = null;
console.log("stop")
}

function reset() {
// expiryTimestamp = props.expiryTimestamp;
minutes = expiryTimestamp / 60
seconds = expiryTimestamp % 60
// showTimer.innerHTML = ("0" + minutes).slice(-2) +"：" + ("0" + seconds).slice(-2);
}

// function playAudio(){
// audio.play();
// }

// function stopAudio(){
// audio.pause();
// }


  return (
    <>
      <MyTimer 
      expiryTimestamp={expiryTimestamp} 
      minutes={minutes}
      seconds={seconds}
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
  )
}

export default App
