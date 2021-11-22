import React, { useState, useEffect } from 'react'


export default function Timer({setStop,questionNumber}) {

    const [time, setTime] = useState(30);
  

     useEffect(() => {
        if(time === 0) {
            setStop(true)
        } 
      
        const Interval=setInterval(() => {
            setTime((current)=>current-1)
        }, 1000);
        
        return () => clearInterval(Interval);
        
    })
    useEffect(() => {
       setTime(30);
    }, [questionNumber])
   

    return  time ;
    
}
