import React, { useState } from "react";
import './Game.css';

function Game() {
  const gameSize = 10;
  const tempState = {};
  const gameArr = [];
  for (let i = 1; i <=gameSize; i++) {
      gameArr.push(i);
  }

  for (let x=0; x<=gameSize+1; x++) {
    for (let y=0; y<=gameSize+1; y++) {
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
    let temp = parseInt(e.dataTransfer.types[0], 10);
    console.log(temp);
    let allowPlacement = (gameState[[x,y]].placeable) && (x + temp - 1 <= gameSize);
    if (!allowPlacement) {
      e.dataTransfer.dropEffect = "none";
    } else {
      if (shipOrientation === "horizontal") {
        for (let i=x; i<=(x+temp-1); i++) {
          allowPlacement = allowPlacement && gameState[[i, y]].placeable;
        }
      }
      e.dataTransfer.dropEffect = (allowPlacement ? "move" : "none");
      //console.log(e.dataTransfer.dropEffect);
    }
  }

  const placeShip = (x, y) => (e) => {
    e.preventDefault();
    let gameStateCopy = JSON.parse(JSON.stringify(gameState));
    let temp = parseInt(e.dataTransfer.types[0], 10);
    if (shipOrientation === "horizontal") {
            gameStateCopy.ships[temp] = {health: temp};
            for (let i=x; i<=(x+temp-1); i++) {
                gameStateCopy[[i,y]].ship = temp;
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
  
  const attackSquare = (x, y) => (e) => {
      if (gameState[[x,y]].attacked === true) {
        return;
      } else {
        let gameStateCopy = JSON.parse(JSON.stringify(gameState));
        gameStateCopy[[x,y]].color = 'red';
        gameStateCopy[[x,y]].attacked = true;
        if (gameStateCopy[[x,y]].hasShip === true) {
          gameStateCopy.ships[gameStateCopy[[x,y]].ship].health -= 1;
          if (gameStateCopy.ships[gameStateCopy[[x,y]].ship].health === 0) {
            gameStateCopy.ships.count -= 1;
          }
        }
        console.log(x,y);
        console.log(gameStateCopy);
        setGameState(gameStateCopy);
        // fix ship reference: pass pointers
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