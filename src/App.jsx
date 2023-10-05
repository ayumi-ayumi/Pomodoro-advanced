import { useState } from 'react'
import './App.css'
import Calendar from 'react-calendar'
import MyTimer from './components/MyTimer'
// import 'react-calendar/dist/Calendar.css'
import alarm from '/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/alarm.mp3'
import cancel from '/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/cancel.png'

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 2); 

  const [value, setValue] = useState()

  return (
    <>
      <MyTimer expiryTimestamp={time} />
      <Calendar 
      value={value}
        onClickDay={(e) => setValue(e)}

        />
      <img src={cancel} />
      <audio controls src={alarm} loop id="audio">現環境では終了時にアラームが鳴りません</audio>
      {/* <div>{value}</div> */}
    </>
  )
}

export default App
