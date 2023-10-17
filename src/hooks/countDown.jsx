import { useEffect, useState } from 'react';

// function countDown () {

//   const [expiryTimestamp, setExpiryTimestamp ] = useState(3)

//   let intervalRef = useRef();

//   useEffect(() => {
//     intervalRef.current = setInterval(()=>{
//       setExpiryTimestamp(prev => {
//         if(prev === 0) {
//           // playAudio();
//           audio.play()
//           stop()
//           // clearInterval(intervalRef.current);
//           return 0
//         } 
//                 return prev - 1
//             })
//         }, 1000);

//   }, [])
// }


const countDown = (target) => {
  const [expiryTimestamp, setExpiryTimestamp ] = useState(target)

  useEffect(() => {
    intervalRef.current = setInterval(()=>{
      setExpiryTimestamp(prev => {
        if(prev === 0) {
          // playAudio();
          audio.play()
          stop()
          // clearInterval(intervalRef.current);
          return 0
        } 
        console.log("countdown hookd")
                return prev - 1
            })
        }, 1000);

  }, [])



}
export { countDown };
