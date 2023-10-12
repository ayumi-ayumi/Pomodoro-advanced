import React, { useRef, useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import 'react-calendar/dist/Calendar.css'
import alarm from '/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3'



export default function MyTimer({ expiryTimestamp }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp,
                 autoStart:false, 
                 onExpire: () => console.warn('onExpire called') 
              });

  let displayMinutes = minutes.toString().padStart(2, '0')
  let displaySeconds = seconds.toString().padStart(2, '0')

  const audio = new Audio(alarm);
  // audio.loop = true
  // console.log(audio)
  // const audio = new Audio('/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3');
  audio.load()
  const myDivRef = useRef(null);

  const [isAlarming, setIsAlarming] = React.useState(false)

  const handleClick = () => {
    // audio.play();
  //  {!totalSeconds === 0 ? isAlarming : setIsAlarming(prev => !prev) }
  stopAudio()
  pause()
    // setIsAlarming(prev => !prev)  

  }

  // const playAudio = () => {
  //   audio.play();
    
  // }
  
   function playAudio(){
    console.log("alraming")
    audio.play();
   }
  
  function stopAudio(){
    console.log("stopped")
    audio.pause();
  }


// const props = {
//   src: alarm,
//   loop: true,
//   autoPlay: true
// }

// {totalSeconds === 0 && setIsAlarming(true)}

// React.useEffect(function() {
//   playAudio()
// }, [isAlarming])



  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{displayMinutes}</span>:<span>{displaySeconds}</span>
        <br />
        {/* <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span> */}
      </div>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
      {/* {totalSeconds === 0 && audio.play()} */}
      {/* {totalSeconds === 0 && playAudio} */}
      {/* {totalSeconds === 0 &&  setIsAlarming(prev => !prev)} */}
      {/* {totalSeconds === 0 ?  setIsAlarming(true) : false} */}
      {/* {totalSeconds === 0 && <audio src={alarm} loop autoPlay ref={myDivRef}>></audio>} */}
      {/* {totalSeconds === 0 && <audio src={alarm} loop autoPlay={isAlarming}></audio>} */}
      {/* <audio {...props}></audio> */}
      {/* <audio src={alarm} loop ref={myDivRef}>This is Audio</audio> */}
      {/* <button onClick={() => {
        start()
      }}>Start</button> */}
      <button onClick={start}>Start</button>
      {/* <button onClick={() => {
        // const time = new Date();
        // time.setSeconds(time.getSeconds() + 0.1);
        // restart(0)
        pause()
        // audio.pause()
        stopAudio()
        // setIsAlarming(prev => !prev)  

        // stopAudio()

      }}>Pause</button> */}
      <button onClick={handleClick}>Pause</button>
      {/* <button onClick={pause}>Pause</button> */}
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Arrange the restart button into the reset button 
        const time = new Date();
        time.setSeconds(time.getSeconds() + 10);
        restart(time)
        pause()
      }}>Reset</button>
      
    </div>
  );
}