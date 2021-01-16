import React, { useState } from "react";
import Game from "./Game";
import Ship from "./Ship";
import './App.css';

function App() {
  const [gameComplete, setGameComplete] = useState(false);
  const [headerMsg, setHeaderMsg] = useState("Place Ships");

  const playerLoss = () => {
    setHeaderMsg("Game Over! Computer wins...");
    setGameComplete(true);
  }
  const computerLoss = () => {
    setHeaderMsg("Game Over! Player wins!");
    setGameComplete(true);
    console.log(gameComplete);
  }

  return (
    <>
    <h1> Battleship! </h1>
    <h2> {headerMsg} </h2>
    <div className="board">
      <Game isPlayer={true} onLoss={playerLoss} gameOver={gameComplete}/>
      <Game isPlayer={false} onLoss={computerLoss} gameOver={gameComplete}/>
    </div>
    <div>
      <Ship size={5} name={"a"}/>
      <Ship size={4} name={"b"}/>
      <Ship size={3} name={"c"}/>
      <Ship size={3} name={"d"}/>
      <Ship size={2} name={"e"}/>
    </div>
    </>
  );
  //add ship reference attribute
}

export default App;