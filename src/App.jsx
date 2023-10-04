import { useState } from 'react'
import './App.css'
import Calendar from 'react-calendar'
import MyTimer from './components/MyTimer'
import 'react-calendar/dist/Calendar.css'

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10); 

  const [value, setValue] = useState()

  return (
    <>
      <MyTimer expiryTimestamp={time} />
      <Calendar 
      value={value}
        onClickDay={(e) => setValue(e)}

        />
      {/* <div>{value}</div> */}
    </>
  )
}

export default App
