import React, { useState, useEffect } from "react";
import './Game.css';

function Game(props) {
  const gameSize = 10;
  const tempState = {};
  const gameArr = [];
  const shipOrientation = "horizontal";

  //useEffect(() => {
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
//}, []);

  tempState.ships = {count: 5};
  
  // if its a computer board, i want to place 5 ships with a while loop and useState that as initial state
  
  useEffect(() => {
  if (!props.isPlayer) {
    console.log("hi");
    const shipArr = [{size: 2, name: "Destroyer"}, {size: 4, name: "Battleship"}, {size: 3, name: "Submarine"}, {size: 3, name: "Cruiser"}, {size: 5, name: "Carrier"}];
    let xRandom, yRandom;
    for (let i=0; i<=4; i++) {
      let size = shipArr[i].size;
      let name = shipArr[i].name;
      let successful = false;
      while (!successful) {
        xRandom = Math.floor((Math.random() * 10) + 1);
        yRandom = Math.floor((Math.random() * 10) + 1);
        let allowPlacement = (tempState[[xRandom,yRandom]].placeable) && (xRandom + size - 1 <= gameSize);
        if (!allowPlacement) {
          successful = false;
        } else {
          if (shipOrientation === "horizontal") {
            for (let j=xRandom; j<=(xRandom+size-1); j++) {
              allowPlacement = allowPlacement && tempState[[j, yRandom]].placeable;
            }
            if (allowPlacement) {
                tempState.ships[name] = {health: size};
                for (let k=xRandom; k<=(xRandom+size-1); k++) {
                    tempState[[k,yRandom]].ship = name;
                    tempState[[k,yRandom]].hasShip = true;
                    tempState[[k,yRandom]].placeable = false;
                    // 8 tiles around are no longer placeable
                    tempState[[(k-1),yRandom]].placeable = false;
                    tempState[[(k-1),(yRandom-1)]].placeable = false;
                    tempState[[(k-1),(yRandom+1)]].placeable = false;
                    tempState[[(k+1),yRandom]].placeable = false;
                    tempState[[(k+1),(yRandom-1)]].placeable = false;
                    tempState[[(k+1),(yRandom+1)]].placeable = false;
                    tempState[[k,(yRandom-1)]].placeable = false;
                    tempState[[k,(yRandom+1)]].placeable = false;
                    tempState[[k, yRandom]].color = 'yellow';
                 }
                 successful = true;
            }
      }
      }
    }
  }
}
}, []);


  
  const [gameState, setGameState] = useState(tempState);

  // if I am a human board, I want to attack myself when launchAttack updates to true
  const attackSquare = (x, y) => () => {
    if (gameState[[x,y]].attacked === true) {
      return;
    } else {
      let gameStateCopy = JSON.parse(JSON.stringify(gameState));
      gameStateCopy[[x,y]].attacked = true;
      if (gameStateCopy[[x,y]].hasShip === true) {
        gameStateCopy[[x,y]].color = 'red';
        gameStateCopy.ships[gameStateCopy[[x,y]].ship].health -= 1;
        if (gameStateCopy.ships[gameStateCopy[[x,y]].ship].health === 0) {
          gameStateCopy.ships.count -= 1;
        }
      } else {
        gameStateCopy[[x,y]].color = 'blue';
      }
      if (gameStateCopy.ships.count === 0) {
        props.onLoss();
      }
      
      if (!props.isPlayer) {
        // attack other board
      }
      
      console.log(gameStateCopy);
      setGameState(gameStateCopy);
    }
}
  

  const dragOverHandler = (x, y) => (e) => {
    e.preventDefault();
    let temp = parseInt(e.dataTransfer.types[0], 10);
    let allowPlacement = (gameState[[x,y]].placeable) && (x + temp - 1 <= gameSize);
    allowPlacement = allowPlacement && props.isPlayer;
    if (!allowPlacement) {
      e.dataTransfer.dropEffect = "none";
    } else {
      if (shipOrientation === "horizontal") {
        for (let i=x; i<=(x+temp-1); i++) {
          allowPlacement = allowPlacement && gameState[[i, y]].placeable;
        }
      }
      e.dataTransfer.dropEffect = (allowPlacement ? "move" : "none");
    }
  }

  const placeShip = (x, y) => (e) => {
    e.preventDefault();
    let gameStateCopy = JSON.parse(JSON.stringify(gameState));
    let temp = parseInt(e.dataTransfer.types[0], 10);
    let identifier = e.dataTransfer.getData(temp);
    if (shipOrientation === "horizontal") {
            gameStateCopy.ships[identifier] = {health: temp};
            for (let i=x; i<=(x+temp-1); i++) {
                gameStateCopy[[i,y]].ship = identifier;
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

  
  return (
    <>
        <div className="grid-container">
          {gameArr.map(y => gameArr.map(x => <button key={[x,y].toString()} style={{background:gameState[[x,y]].color}} disabled={props.isPlayer || props.gameOver} onDragOver={dragOverHandler(x, y)} onClick={attackSquare(x,y)} onDrop={placeShip(x,y)}> </button>))}
        </div>
    </>
  );
}

export default Game;