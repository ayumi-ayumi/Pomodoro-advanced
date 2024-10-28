# Timer-record :stopwatch:
[Click here to see the demo](https://ayumi-ayumi.github.io/pomodoro-timer-record/)
![myTimer-demo](https://github.com/ayumi-ayumi/Timer-record/assets/69543331/56c47182-9ce2-4e3f-922c-bbab1199117e)

### About
Developed a Pomodoro timer app that tracks work sessions and displays daily productivity on a calendar.

### How to use
1. Set a timer by typing how many minutes you want to set or clicking up or down spinner buttons (step is 5 and max is 60).

2. When the timer runs out, it notices you by an alarm sound. 🔔

3. The work session time is added to the day's total, allowing you to see the total hours and minutes you've completed in a day directly on the calendar.	📅
  
4. The reset button resets the timer back to its initial state.

### Update
I noticed that the timer is sometimes not working on the background, especially SetIntervel() does not work on the background.  
I use Web Worker API to fix this issue.

### Built With
* ![React image](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
* ![vite image](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white)
* ![npm image](https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)https://www.npmjs.com/package/react-calendar
* Web Worker API
