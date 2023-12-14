import { useEffect, useState } from 'react';


export default function useCountdown(time,started) {

  const [timeLeft, setTimeLeft] = useState(time);
  
  const[timerStarted,SetTimerStarted]=useState(false)

  
  useEffect(() => {
   
    if (!timeLeft) return;

    if(started){
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000*60);
    return () => clearInterval(intervalId);

}
    
  }, [timeLeft,started]);
  return timeLeft
   

}