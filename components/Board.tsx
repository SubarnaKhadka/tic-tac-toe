import {useEffect, useState} from 'react'
import Square from './Square';
import style from '../styles/Board.module.css'

type WinnerType = "X"| "O" |"BOTH"| null;
type PlayerType = "X"|"O";
type SquaresVal =  "X"| "O" | null;

//global fuction
function findWinner(sqauresVal:SquaresVal[]){
const horizontalCut = [[0,1,2],[3,4,5],[6,7,8]];
const verticalCut = [[1,4,7],[2,5,8],[0,3,6]];
const diagonalCut = [[0,4,8],[2,4,6]];
const allCut = [...horizontalCut,...verticalCut,...diagonalCut];

for(let i = 0; i<allCut.length;i++){
 const [x,y,z]:number[] = allCut[i];
 if(sqauresVal[x] && sqauresVal[x]===sqauresVal[y] && sqauresVal[x]===sqauresVal[z]){
  return sqauresVal[x];
  }
 }
 return null;
}

function Board() {
  //initialStates
  const [winner,setWinner] = useState<WinnerType>(null);
  const [currentPlayer,setCurrentPlayer] = useState<PlayerType>(
   Math.round(Math.random()*1)== 0 ? "O":"X"
  );
  const [sqauresVal,setSquaresVal] = useState(Array<SquaresVal>(9).fill(null));


  //local functions
  function reset(){
    setSquaresVal(Array<SquaresVal>(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random()*1)== 0 ? "O":"X");
  }

  function setSquareValue(index:number){
    const latestData = sqauresVal.map((val,i)=>{
      if(i==index) return currentPlayer;
      return val;
    })
    setSquaresVal(latestData);
    setCurrentPlayer(currentPlayer ==="X" ? "O":"X");
  }

  //React hooks
  useEffect(()=>{
    const win = findWinner(sqauresVal);
    if(win){
      setWinner(win);
    }
    if(!win && !sqauresVal.filter((square)=>!square).length){
     setWinner("BOTH");
    }
  },[sqauresVal]);


  return (
     <div>
      {!winner && <p> Hey {currentPlayer}, it&apos;s your turn</p>}
      {winner && winner!=="BOTH" && <p className={style.winner}>Congratulations {winner}</p>}
      {winner && winner === "BOTH" && <p>Congratulations both are Winner</p>}

     <div className={style.grid}>
    {Array(9).fill(null).map((_,i)=>{
        return(
         <Square   
         key ={i}
         value = {sqauresVal[i]}
         winner = {winner}
         onClick = {()=>setSquareValue(i)}
         />
        )
    })}
     </div>
     <button className={style.reset} onClick={reset}> RESET</button>
     </div>
  )
}

export default Board