import React, { useState } from "react";
import './Game.css';

function Game() {
  const gameSize = 10;
  const tempState = {};
  const gameArr = [];
  for (let i = 1; i <=gameSize; i++) {
      gameArr.push(i);
  }

  for (let x=1; x<=gameSize; x++) {
    for (let y=1; y<=gameSize; y++) {
        let tempArr = [x,y];
        tempState[tempArr]=
        {ship:null,attacked:false,hasShip:false,placeable:true};
    }
  }
  const [gameState, setGameState] = useState(tempState);
  // use js to build the gameboard display
  // when a button is pressed, send its coordinates to a function that attacks the ship on the tile if its there
  // store the coordinates of where ships are in a Gameboard object
  // if a ship is in the position in the Gameboard, damage the ship and check if its health is now 0
  // ship is stored in gameboard
  let shipOrientation = "horizontal";
  
  const callBackFuntion = (x, y) => (e) => {
      console.log(x,y);
      e.target.style.backgroundColor = 'red';
      gameState[[x,y]].attacked = true;
      setGameState(gameState);
  }
  
  return (
    <>
        <div className="grid-container">{gameArr.map(y => gameArr.map(x => <button onClick={callBackFuntion(x,y)}> {x}, {y}</button>))}</div>
        {/* <button onClick={() => console.log(gameState)}>Hello</button> */}
    </>
  );
}

export default Game;