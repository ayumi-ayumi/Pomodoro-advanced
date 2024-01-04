
let timerInterval;
onmessage = ({ data: { isActive, expiryTimestamp } })=> {
  let time = expiryTimestamp;

  // console.log(isActive, expiryTimestamp)


  if (!isActive || timerInterval || time === 0) {
    clearInterval(timerInterval);
    // time = 0;
  }

  if (isActive && time) {
    timerInterval = setInterval(() => {
      time -= 1;
      postMessage({ time });
    }, 1000);
  }
  // let time = e.data
  //   setInterval(() => {
  //     time --;
  //     postMessage(time);
  //   }, 1000);
};

// onmessage = ({ data: { count, turn} }) => {
//   setInterval(() => {
//     count--;
//     postMessage(count)
//   }, 1000);
// };

