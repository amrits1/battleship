import React, { useState } from "react";
import Game from "./Game";
import Ship from "./Ship";
import './App.css';

function App() {
  const [gameComplete, setGameComplete] = useState(false);
  const [playerHeaderMsg, setPlayerHeaderMsg] = useState("Place Ships");
  const [computerHeaderMsg, setComputerHeaderMsg] = useState("");

  const playerLoss = () => {
    setPlayerHeaderMsg("Game Over! Computer wins...");
    setComputerHeaderMsg("");
    setGameComplete(true);
  }
  const computerLoss = () => {
    setPlayerHeaderMsg("Game Over! Player wins!");
    setComputerHeaderMsg("");
    setGameComplete(true);
  }

  return (
    <>
    <h1> Battleship! </h1>
    <h2> {playerHeaderMsg} </h2>
    <h2> {computerHeaderMsg} </h2>
    <div className="board">
      <Game 
      isPlayer={true}
      //interactions between players: 
      onLoss={playerLoss}
      gameOver={gameComplete}
      />
      <Game 
      isPlayer={false}
      //interactions between players: 
      onLoss={computerLoss} 
      gameOver={gameComplete}
      />
    </div>
    <div>
      <Ship size={5} name={"Carrier"}/>
      <Ship size={4} name={"Battleship"}/>
      <Ship size={3} name={"Cruiser"}/>
      <Ship size={3} name={"Submarine"}/>
      <Ship size={2} name={"Destroyer"}/>
    </div>
    </>
  );
}

export default App;