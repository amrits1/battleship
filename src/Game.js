import React from "react";
import "./Game.css";

function Game(props) {
  const gameSize = 10;
  const gameArr = [];
  const shipOrientation = "horizontal";

  for (let i = 1; i <= gameSize; i++) {
    gameArr.push(i);
  }
  const gameState = props.isPlayer ? props.playerState : props.compState;
  const setGameState = props.isPlayer
    ? props.setPlayerState
    : props.setCompState;

  const attackSquare = (x, y) => () => {
    if (gameState[[x, y]].attacked === true) {
      return;
    } else {
      let gameStateCopy = JSON.parse(JSON.stringify(gameState));
      gameStateCopy[[x, y]].attacked = true;
      if (gameStateCopy[[x, y]].hasShip === true) {
        gameStateCopy[[x, y]].color = "red";
        gameStateCopy.ships[gameStateCopy[[x, y]].ship].health -= 1;
        if (gameStateCopy.ships[gameStateCopy[[x, y]].ship].health === 0) {
          gameStateCopy.ships.count -= 1;
        }
      } else {
        gameStateCopy[[x, y]].color = "blue";
      }
      if (gameStateCopy.ships.count === 0) {
        props.onLoss();
      } else {
        if (!props.isPlayer) {
          // attack other board, props.playerState
          let successful = false;
          let xRandom, yRandom;
          while (!successful) {
            xRandom = Math.floor(Math.random() * 10 + 1);
            yRandom = Math.floor(Math.random() * 10 + 1);
            if (!props.playerState[[xRandom, yRandom]].attacked) {
              successful = true;
              let playerStateCopy = JSON.parse(
                JSON.stringify(props.playerState)
              );
              playerStateCopy[[xRandom, yRandom]].attacked = true;
              if (playerStateCopy[[xRandom, yRandom]].hasShip === true) {
                playerStateCopy[[xRandom, yRandom]].color = "red";
                playerStateCopy.ships[
                  playerStateCopy[[xRandom, yRandom]].ship
                ].health -= 1;
                if (
                  playerStateCopy.ships[
                    playerStateCopy[[xRandom, yRandom]].ship
                  ].health === 0
                ) {
                  playerStateCopy.ships.count -= 1;
                }
              } else {
                playerStateCopy[[xRandom, yRandom]].color = "blue";
              }
              props.setPlayerState(playerStateCopy);
              if (playerStateCopy.ships.count === 0) {
                props.onWin();
              }
            }
          }
        }
      }

      console.log(gameStateCopy);
      setGameState(gameStateCopy);
    }
  };

  const dragOverHandler = (x, y) => (e) => {
    e.preventDefault();
    let temp = parseInt(e.dataTransfer.types[0], 10);
    let allowPlacement =
      gameState[[x, y]].placeable && x + temp - 1 <= gameSize;
    allowPlacement = allowPlacement && props.isPlayer;
    if (!allowPlacement) {
      e.dataTransfer.dropEffect = "none";
    } else {
      if (shipOrientation === "horizontal") {
        for (let i = x; i <= x + temp - 1; i++) {
          allowPlacement = allowPlacement && gameState[[i, y]].placeable;
        }
      }
      e.dataTransfer.dropEffect = allowPlacement ? "move" : "none";
    }
  };

  const placeShip = (x, y) => (e) => {
    e.preventDefault();
    let gameStateCopy = JSON.parse(JSON.stringify(gameState));
    let temp = parseInt(e.dataTransfer.types[0], 10);
    let identifier = e.dataTransfer.getData(temp);
    if (shipOrientation === "horizontal") {
      gameStateCopy.ships[identifier] = { health: temp };
      for (let i = x; i <= x + temp - 1; i++) {
        gameStateCopy[[i, y]].ship = identifier;
        gameStateCopy[[i, y]].hasShip = true;
        gameStateCopy[[i, y]].placeable = false;
        // 8 tiles around are no longer placeable
        gameStateCopy[[i - 1, y]].placeable = false;
        gameStateCopy[[i - 1, y - 1]].placeable = false;
        gameStateCopy[[i - 1, y + 1]].placeable = false;
        gameStateCopy[[i + 1, y]].placeable = false;
        gameStateCopy[[i + 1, y - 1]].placeable = false;
        gameStateCopy[[i + 1, y + 1]].placeable = false;
        gameStateCopy[[i, y - 1]].placeable = false;
        gameStateCopy[[i, y + 1]].placeable = false;
        gameStateCopy[[i, y]].color = "yellow";
      }
      setGameState(gameStateCopy);
    }
  };

  return (
    <>
      <div className="grid-container">
        {gameArr.map((y) =>
          gameArr.map((x) => (
            <button
              key={[x, y].toString()}
              style={{ background: gameState[[x, y]].color }}
              disabled={props.isPlayer || props.gameOver}
              onDragOver={dragOverHandler(x, y)}
              onClick={attackSquare(x, y)}
              onDrop={placeShip(x, y)}
            >
              {" "}
            </button>
          ))
        )}
      </div>
    </>
  );
}

export default Game;
