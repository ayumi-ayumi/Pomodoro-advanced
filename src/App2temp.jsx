import { useState, useEffect, useRef } from 'react'
import './App.css'
import Calendar from 'react-calendar'
import MyTimer from './components/MyTimer'
// import 'react-calendar/dist/Calendar.css'
import alarm from '/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3'
// import useInterval from 'use-interval'
import { countDown } from './hooks/countDown';
import * as React from "react";
import { render } from "react-dom";

function App() {
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + 4); 

  const [value, setValue] = useState()

  
  const [expiryTimestamp, setExpiryTimestamp ] = React.useState(3)

  let intervalRef = useRef(null);

  // let count = 0;

  const audio = new Audio(alarm);

  // useEffect(() => {
  //   intervalRef.current = setInterval(()=>{
  //     setExpiryTimestamp(prev => {
  //       if(prev === 0) {
  //         // playAudio();
  //         audio.play()
  //         stop()
  //         // clearInterval(intervalRef.current);
  //         return 0
  //       } 
  //               return prev - 1
  //           })
  //       }, 1000);

  // }, [])
  // React.useEffect(()=>{
  //   // countDown()
  //   intervalRef.current = setInterval(()=>{
  //     setExpiryTimestamp((prev) => prev - 1)
  //   }, 1000);
  //   return
  //     // audio.play()
  //     ()=>clearInterval(intervalRef.current);
  // }, [])

function countDown() {

  // setExpiryTimestamp(prev => {
  //   if(prev === 0) {
  //     console.log("this is 0")
  //     // playAudio();
  //     // audio.play()
  //     // stop()
  //     // clearInterval(intervalRef.current);
  //     return 0
  //   }  
  //   intervalRef.current = setInterval(()=>{
  //           return prev - 1
  //   }, 1000);
  // })


  // useEffect(() => {
  //   let n = expiryTimestamp;
  //   intervalRef.current = setInterval(()=>{
  //           n--;
  //           setExpiryTimestamp(n)
  //           // setExpiryTimestamp(prev => {
  //           //   if(prev === 0) {
  //           //     playAudio();
  //           //     // audio.play()
  //           //     // stop()
  //           //     // clearInterval(intervalRef.current);
  //           //     return 0
  //           //   } 
  //           //     n--;
  //           //     return n
  //           // })
  //       }, 1000);
   
  // });


  // useEffect(() => {

  //   intervalRef.current = setInterval(()=>{
  //           setExpiryTimestamp(prev => {
  //             if(prev === 0) {
  //               // playAudio();
  //               audio.play()
  //               stop()
  //               // clearInterval(intervalRef.current);
  //               return 0
  //             } 
  //               return prev - 1
  //           })
  //       }, 1000);
  // }, [])
//   React.useEffect(()=>{
//     id.current=window.setInterval(()=>{
//      setTimer((time)=>time-1)
//    },1000)
//    return ()=>clear();
//  },[])


  // intervalRef.current = setInterval(()=>{
  //         setExpiryTimestamp(prev => prev - 1)
  //       }, 1000);
  //       return
  //         audio.play()
  //         clearInterval(intervalRef.current);

          
  intervalRef.current = setInterval(()=>{
          setExpiryTimestamp(prev => {
            if(prev === 0) {
              // playAudio();
              audio.play()
              stop()
              // clearInterval(intervalRef.current);
              return 0
            } 
              return prev - 1
          })
      }, 1000);
}

// function start(
//   countDown()
// )
// timerID = setInterval(() => countDown(), 1000);
// useEffect(function(){
//   timerID = setInterval(countDown, 1000);

// }) 
// timerID = setInterval(countDown,1000);

// console.log(123)
// setInterval(() => countDown(), 1000);
// setInterval(countDown(), 1000);
// timerID = countDown()

// function start() {
// // timerID = setInterval(() => countDown(), 1000);
// // useEffect(function(){
// //   timerID = setInterval(countDown, 1000);

// // }) 
// // timerID = setInterval(countDown,1000);

// // console.log(123)
// countDown()
// // setInterval(() => countDown(), 1000);
// // setInterval(countDown(), 1000);
// // timerID = countDown()
// }

// function playAudio(){
//   audio.play();
// }
  
function stopAudio(){
  audio.volume = 0;
  audio.currentTime = 0;
  audio.src=""
  audio.load()
  audio.remove()
  audio.pause();
  clearInterval(intervalRef.current);
  // console.log("stopAudio button")
  // console.log(audio.src)
}

function stop () {
  // clearInterval(timerID);
  // stopAudio();
  // audio.pause();
  // console.log("stop button")

  clearInterval(intervalRef.current);
  // intervalRef.current=null
// timerID = null;
}

function reset() {
  // expiryTimestamp = props.expiryTimestamp;
  setExpiryTimestamp(3)
// minutes = expiryTimestamp / 60
// seconds = expiryTimestamp % 60
// showTimer.innerHTML = ("0" + minutes).slice(-2) +"：" + ("0" + seconds).slice(-2);
}

return (
    <>
      <MyTimer 
      expiryTimestamp={expiryTimestamp} 
      start={countDown}
      stop={stop}
      reset={reset}
      // stopAudio={stopAudio}
      // playAudio={playAudio}
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
