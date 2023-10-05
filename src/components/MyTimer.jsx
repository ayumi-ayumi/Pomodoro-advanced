import React from 'react';
import { useTimer } from 'react-timer-hook';
import 'react-calendar/dist/Calendar.css'
import alarm from '/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3'



export default function MyTimer({ expiryTimestamp }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart:false, onExpire: () => console.warn('onExpire called') });

  let displayMinutes = minutes.toString().padStart(2, '0')
  let displaySeconds = seconds.toString().padStart(2, '0')

  const audio = new Audio({alarm});

  // function playaudio(){
  //   audio.play();
  // }
  
  // function stopaudio(){
  //   audio.pause();
  // }


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{displayMinutes}</span>:<span>{displaySeconds}</span>
      </div>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
      {totalSeconds === 0 && audio.play()}
      {/* {totalSeconds === 0 && <audio src={alarm} loop autoPlay id="audio"></audio>} */}
      <button onClick={start}>Start</button>
      <button onClick={() => {
        audio.pause()
        // pause()

      }}>Pause</button>
      {/* <button onClick={pause}>Pause</button> */}
      {/* <button onClick={resume}>Resume</button> */}
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