import React, { useState,useEffect } from 'react';
import { data } from '../data';
import useSound from 'use-sound';
import correct from "../sounds/correct.mp3";
import play from "../sounds/play.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Trivia({questionNumber,setQuestionNumber,setStop}) {
   const [question, setQuestion] = useState(null);
   const [selectedAnswer, setSelectedAnswer] = useState(null);
   const [className, setClassName] = useState("answer");
   const[correctAnswer]=useSound(correct);
   const[wrongAnswer]=useSound(wrong);
   const[letsPlay]=useSound(play);


   useEffect(() => {
       
    letsPlay();
    },[letsPlay])

   const delay=(duration,callback)=>{

    setTimeout(() => {
        callback();
    }, duration);
   }
   const handleClick=(a)=>{
       setSelectedAnswer(a);
       setClassName("answer active");
       delay(3000,()=>
        setClassName(a.correct ? "answer correct" : "answer wrong")
       )

       delay(5000,()=>{

        if(a.correct){
            correctAnswer();
            delay(1000,()=>{
                setQuestionNumber((current)=>current+1);
                setSelectedAnswer(null);
            })
         
        }else{
            
            wrongAnswer();
            delay(1000,()=>{
            setStop(true);
            })

        }
           
        
       })
      

   }

   useEffect(() => {
      setQuestion(data[questionNumber-1]);

   }, [data,questionNumber])
    return (
        <div className="trivia">
             
             
              <div className="question">
             {question?.question}
      </div>
      <div className="answers">
         {question?.answers.map((a)=>(

<div className={selectedAnswer===a ? className : "answer"} onClick={()=>handleClick(a)}>{a.text}</div>

         ))}
          
        </div>
        </div>
    )
}
