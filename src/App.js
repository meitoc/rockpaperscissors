import './App.css';
import { useEffect, useState } from "react";
function App() {
  return (
    <div className="App">
        <h1>
          OẢNH TÙ TÌ
        </h1>
          <Render/>
    </div>
  );
}

function Render(){
  const [game,gameState] = useState(0); //0: play, 1: clicked ,2: result, 3: stop
  const [hand,handState] = useState(0); //0: not, 1-3: rock, paper, scissors
  const [hand2nd, hand2ndState] = useState(0);
  const [referee, refereeState] = useState('Hãy chọn "búa", "báo" hoặc "kéo"');
  useEffect(()=>{
    console.log("a");//for testing
    if(game===2){
      setTimeout(() => {
        gameState(3);
        let compare = hand-hand2nd;
        // console.log(hand);
        let compareShow = compare>0 ? ( compare%2 ? "Bạn thắng" : "Bạn thua") : compare<0 ? ( compare%2 ? "Bạn thua" : "Bạn thắng") : "Hòa nhau rồi!";
        // console.log(compareShow);
        refereeState(compareShow);
        console.log("b");//for testing
      } , 600);
    }
  },[hand,game,hand2nd])
  
  const buttonColor = [{backgroundColor:"green"},{backgroundColor:"green"},{backgroundColor:"green"}];
  if (hand>0) buttonColor[hand-1].backgroundColor = "red";
  let handIcon = game ? choseHandIcon(hand) : "";
  let hand2ndIcon = game ? choseHandIcon(hand2nd) : "";
  let buttonRestart;
  buttonRestart = game===0 ? <button onClick = {startGame}>RA TAY</button> : (game===1 ||game===2) ? <button>RA TAY</button> : <button onClick = {resetGame}>CHƠI LẠI</button>;

  function rockPaperScissors(input){
  handState(input);
  }

  function resetGame(){
    handState(0);
    gameState(0);
    hand2ndState(0);
    refereeState('Hãy chọn "búa", "bao" hoặc "kéo"');
  }
  
  function startGame(){
    if(hand!==0) {
      if (game===0){
        gameState(1);
        refereeState("Oảnh tù tì");
        setTimeout(() => {
          refereeState("Ra cái gì");
        }, 600);
        setTimeout(() => {
          refereeState("Ra cái này");
          let hand2 = Math.floor(Math.random() * 3) + 1;
          hand2ndState(hand2);
          gameState(2);
        }, 1200);
        
      };
    }
  }
  
  function ChoseButton(props){
    if(props.click) return (<button style = {buttonColor[props.index-1]} onClick = {()=>rockPaperScissors(props.index)}>{choseHandIcon(props.index)}</button>);
    else return (<button style = {buttonColor[props.index-1]}>{choseHandIcon(props.index)}</button>);
  }
  
  return (
    <div className="container">
      <div clsss="chooseShow">
        <ChoseButton index={1} click={game===0 || game===1} />
        <ChoseButton index={2} click={game===0 || game===1} />
        <ChoseButton index={3} click={game===0 || game===1} />
      </div>
      <div>
        {buttonRestart}
      </div>
      <div className="hand"><div className="handShow">{handIcon}</div></div>
      <div className="referee">Trọng tài:<br></br>{referee}</div>
      <div className="hand"><div className="handShow">{hand2ndIcon}</div></div>
    </div>
  );
}

function choseHandIcon(input){
  return input===1 ? "👊" : input===2 ?  "✋" : input===3 ? "✌" : "";
}
export default App;
