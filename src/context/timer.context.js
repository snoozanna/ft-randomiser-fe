
import React, { createContext, useEffect, useState } from 'react';


// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
export const TimerContext = createContext({
  timer: {
    time: "",
    setTime: () => {},
    isRunning: "",
    setIsRunning: () => {},
    startTimer: () => {},
    stopTimer: () => {},
    resetTimer: () => {},
    oneMinWarning: ""
  },

});

export function TimerProvider({ children }) {
  

    //  TIMER 
   const [time, setTime] = useState(600); 
   const [isRunning, setIsRunning] = useState(false);
    const [oneMinWarning, setOneMinWarning] = useState(false); 


// TIMER    
  useEffect(() => {
    // console.log("time", time)
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
          if(time <= 60){
            setOneMinWarning(true)
          }
        } else {
          clearInterval(interval);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);
 
const startTimer = () => {
  setIsRunning(true);
};

const stopTimer = () => {
  setIsRunning(false);
};

const resetTimer = () => {
  setIsRunning(false);
  setOneMinWarning("");
  setTime(600); // Reset to 10 minutes
};



  return (
    <TimerContext.Provider
      value={{
        time,
        setTime,
        isRunning,
        setIsRunning,
        startTimer,
        stopTimer,
        resetTimer,
        oneMinWarning,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
export default TimerContext;
