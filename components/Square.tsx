type WinnerType = "X"| "O" |"BOTH"| null;

interface square{
    value: WinnerType,
    winner:WinnerType,
    onClick:()=>void;
}

function Square(data:square) {
    if(data.value==null){
      return(
        <button className='square'  onClick={data.onClick} disabled = {Boolean(data.winner)}/>
      )
    }
  return (
    <button className={`square val_${data.value.toLocaleLowerCase()}`} disabled>
        {data.value}
    </button>
  )
}

export default Square