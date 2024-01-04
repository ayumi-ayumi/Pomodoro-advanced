let timerInterval;
onmessage = ({ data: { isActive, expiryTimestamp } }) => {
  let time = expiryTimestamp;

  if (!isActive || timerInterval || time === 0) {
    clearInterval(timerInterval);
  }

  if (isActive && time) {
    timerInterval = setInterval(() => {
      time -= 1;
      postMessage({ time });
    }, 1000);
  }
};
