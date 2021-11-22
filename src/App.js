
import { useEffect, useState , useMemo} from 'react';
import Start from './Components/Start';
import Timer from './Components/Timer';
import Trivia from './Components/Trivia';
import './styles.scss';


function App() {

  const[userName,setUserName]=useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$0");
  const [stop, setStop] = useState(false);
  const [final, setFinal] = useState(false);



  const moneyPyramid  = useMemo(()=>
  [
    { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
      []);


      
  useEffect(() => {
    
    questionNumber>1 &&
    setEarned(moneyPyramid.find((m)=>m.id===questionNumber-1).amount);

     if(questionNumber>15){
       setFinal(true);
     }

    
  }, [moneyPyramid,questionNumber])

  return (

    
    <div className="App">

      {userName ?
       ( 
        <>
       
      
      <div className="main">
    {stop ? <h1 className="end-text">You earned {earned}</h1>: 
    final ? <h1 className="final-text">congratulations! <br/> You earned : {earned}</h1>: (
    
            <>
           <div className="top">
           <div className="timer"> <Timer setStop={setStop} questionNumber={questionNumber} />
           </div>
           </div>
           <div className="bottom">
             <Trivia setStop={setStop} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber}/>
           </div>
           </>
    
    )}
    
         </div>
         <div className="sidebar">

         <div className="nav">
          <div className="user-name">Player : {userName}</div>
          <div className="money-earned">{earned}</div>
        </div>
    
    <div className="pyramid">
    
         <ul className="money-list">
           
    
           {moneyPyramid.map((m)=>( 
               <li className={questionNumber === m.id ? "money-list-item active" : "money-list-item"}>
               <span className="item-number" >{m.id}</span>
               <span className="item-amount">{m.amount}</span>
             </li>
    
           ))}
             
        
             </ul>
             </div>
         </div>
         </>
         )  :

         <Start setUsername={setUserName}/>
    }

    
    </div>
  );
}

export default App;
