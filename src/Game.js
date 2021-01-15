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
        {ship:null,attacked:false,hasShip:false,placeable:true,color:"light_blue"};
    }
  }
  tempState.ships = {count: 5};
  const [gameState, setGameState] = useState(tempState);
  let shipOrientation = "horizontal";

  const dragOverHandler = (x, y) => (e) => {
    e.preventDefault();
    if (gameState[[x,y]].placeable) {
      e.dataTransfer.dropEffect = "move";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  }

  const placeShip = (x, y) => (e) => {
    e.preventDefault();
    let gameStateCopy = JSON.parse(JSON.stringify(gameState));
    let temp = parseInt(e.dataTransfer.getData("text"), 10);
    if (shipOrientation === "horizontal") {
        let acc = true;
        if (x + temp - 1 > gameSize) {
          acc = false;
        } else {
            for (let i=x; i<=(x+temp-1); i++) {
              // fix this
                acc = (acc && gameStateCopy[[i,y]].placeable);
                console.log(gameStateCopy);
            }
          }
        if (!acc) {
            e.dataTransfer.dropEffect = "none";
            console.log(gameStateCopy);
        } else {
            gameStateCopy.ships[temp] = {health: temp};
            for (let i=x; i<=(x+temp-1); i++) {
                gameStateCopy[[i,y]].ship = gameStateCopy.ships[temp];
                gameStateCopy[[i,y]].hasShip = true;
                gameStateCopy[[i,y]].placeable = false;
                // 8 tiles around are no longer placeable
                gameStateCopy[[(i-1),y]].placeable = false;
                gameStateCopy[[(i-1),(y-1)]].placeable = false;
                gameStateCopy[[(i-1),(y+1)]].placeable = false;
                gameStateCopy[[(i+1),y]].placeable = false;
                gameStateCopy[[(i+1),(y-1)]].placeable = false;
                gameStateCopy[[(i+1),(y+1)]].placeable = false;
                gameStateCopy[[i,(y-1)]].placeable = false;
                gameStateCopy[[i,(y+1)]].placeable = false;
                gameStateCopy[[i, y]].color = 'yellow';
            }
            setGameState(gameStateCopy);
        }
    }
    }
  
  const attackSquare = (x, y) => (e) => {
      if (gameState[[x,y]].attacked === true) {
        return;
      } else {
        console.log(x,y);
        console.log(gameState);
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
        <div className="grid-container">{gameArr.map(y => gameArr.map(x => <button style={{background:gameState[[x,y]].color}} onDragOver={dragOverHandler(x, y)} onClick={attackSquare(x,y)} onDrop={placeShip(x,y)}> </button>))}</div>
        {/* <button onClick={() => console.log(gameState)}>Hello</button> */}
    </>
  );
}

export default Game;