import React, { useState } from "react";
import './Game.css';

function Game() {
  const gameSize = 10;
  const tempState = {};
  const gameArr = [];
  for (let i = 1; i <=gameSize; i++) {
      gameArr.push(i);
  }

  for (let x=0; x<=(gameSize+1); x++) {
    for (let y=0; y<=(gameSize+1); y++) {
        let tempArr = [x,y];
        tempState[tempArr]=
        {ship:null,attacked:false,hasShip:false,placeable:true};
    }
  }
  const [gameState, setGameState] = useState(tempState);
  let shipOrientation = "horizontal";

  const placeShip = (gameboard, ship, x, y) => (e) => {
    if (shipOrientation === "horizontal") {
        let acc = true;
            for (let i=x; i<=(x+ship.length-1); i++) {
                acc = (acc && gameState[[i,y]].placeable)
            }
        if ((x + ship.length - 1 > gameSize) || !(acc)){
            return "unsuccessful";
        } else {
            for (let i=x; i<=(x+ship.length-1); i++) {
                gameState[[i,y]].ship = ship;
                gameState[[i,y]].hasShip = true;
                gameState[[i,y]].placeable = false;
                // 8 tiles around are no longer placeable
                gameState[[(i-1),y]].placeable = false;
                gameState[[(i-1),(y-1)]].placeable = false;
                gameState[[(i-1),(y+1)]].placeable = false;
                gameState[[(i+1),y]].placeable = false;
                gameState[[(i+1),(y-1)]].placeable = false;
                gameState[[(i+1),(y+1)]].placeable = false;
                gameState[[i,(y-1)]].placeable = false;
                gameState[[i,(y+1)]].placeable = false;
            }
        }
    }
    }
  
  const attackSquare = (x, y) => (e) => {
      if (gameState[[x,y]].attacked === true) {
        return;
      } else {
        console.log(x,y);
        e.target.style.backgroundColor = 'red';
        gameState[[x,y]].attacked = true;
        if (gameState[[x,y]].hasShip === true) {
          gameState[[x,y]].ship.attackShip();
        }
        setGameState(gameState);
      }
  }
  
  return (
    <>
        <div className="grid-container">{gameArr.map(y => gameArr.map(x => <button onClick={attackSquare(x,y)}> </button>))}</div>
        {/* <button onClick={() => console.log(gameState)}>Hello</button> */}
    </>
  );
}

export default Game;