import "/Users/Ayumi/Desktop/SelfStudy/React/pomodoro-advanced/pomodoro-advanced/src/MyTimer.css";

export default function MyTimer(props) {
  let timeLeft = props.timeLeft;
  let m = timeLeft / 60;
  let s = timeLeft % 60;
  let timeLeftMinutes = ("0" + (Math.floor(timeLeft / 60))).slice(-2);
  let timeLeftSeconds = ("0" + timeLeft % 60).slice(-2);
  
  let totalSeconds = props.totalSeconds;

  return (
    <div style={{ textAlign: "center" }}>
      <div className="settingTimer">
        <input
          type="number"
          min={5}
          max={60}
          step={5}
          onChange={props.handleChange}
        />
        Minutes
      </div>
      <div className="timeLeft">
       {timeLeft ? <span>{timeLeftMinutes}</span> : <span>00</span>}:
       {timeLeft ? <span>{timeLeftSeconds}</span> : <span>00</span>}
      </div>
      {/* {totalSeconds &&<div>{totalSeconds}</div> } */}
      {totalSeconds &&<div className="totalHours">{props.totalSecondsToHours}H {props.totalSecondsToMinutes}</div> }
      {/* {<div>{props.isActive ? "active": "no active"}</div>} */}
      <div>
        <button className="timerButtons" onClick={props.start}>START</button>
        <button className="timerButtons" onClick={props.stop}>STOP</button>
        <button className="timerButtons" onClick={props.reset}>RESET</button>
      </div>
    </div>
  );
}
