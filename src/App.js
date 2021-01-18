import React, { useState, useEffect } from "react";
import Game from "./Game";
import Ship from "./Ship";
import "./App.css";

function App() {
  const [gameComplete, setGameComplete] = useState(false);
  const [playerHeaderMsg, setPlayerHeaderMsg] = useState("Place Ships");
  const [computerHeaderMsg, setComputerHeaderMsg] = useState("");

  const gameSize = 10;
  const tempState = {};
  const gameArr = [];
  const shipOrientation = "horizontal";

  for (let i = 1; i <= gameSize; i++) {
    gameArr.push(i);
  }

  for (let x = 0; x <= gameSize + 1; x++) {
    for (let y = 0; y <= gameSize + 1; y++) {
      let tempArr = [x, y];
      tempState[tempArr] = {
        ship: null,
        attacked: false,
        hasShip: false,
        placeable: true,
        color: "light_blue",
      };
    }
  }

  tempState.ships = { count: 5 };
  const tempState2 = JSON.parse(JSON.stringify(tempState));
  useEffect(() => {
    console.log("Used effect");
    const shipArr = [
      { size: 2, name: "Destroyer" },
      { size: 4, name: "Battleship" },
      { size: 3, name: "Submarine" },
      { size: 3, name: "Cruiser" },
      { size: 5, name: "Carrier" },
    ];
    let xRandom, yRandom;
    for (let i = 0; i <= 4; i++) {
      let size = shipArr[i].size;
      let name = shipArr[i].name;
      let successful = false;
      while (!successful) {
        xRandom = Math.floor(Math.random() * 10 + 1);
        yRandom = Math.floor(Math.random() * 10 + 1);
        let allowPlacement =
          tempState[[xRandom, yRandom]].placeable &&
          xRandom + size - 1 <= gameSize;
        if (!allowPlacement) {
          successful = false;
        } else {
          if (shipOrientation === "horizontal") {
            for (let j = xRandom; j <= xRandom + size - 1; j++) {
              allowPlacement =
                allowPlacement && tempState[[j, yRandom]].placeable;
            }
            if (allowPlacement) {
              tempState.ships[name] = { health: size };
              for (let k = xRandom; k <= xRandom + size - 1; k++) {
                tempState[[k, yRandom]].ship = name;
                tempState[[k, yRandom]].hasShip = true;
                tempState[[k, yRandom]].placeable = false;
                // 8 tiles around are no longer placeable
                tempState[[k - 1, yRandom]].placeable = false;
                tempState[[k - 1, yRandom - 1]].placeable = false;
                tempState[[k - 1, yRandom + 1]].placeable = false;
                tempState[[k + 1, yRandom]].placeable = false;
                tempState[[k + 1, yRandom - 1]].placeable = false;
                tempState[[k + 1, yRandom + 1]].placeable = false;
                tempState[[k, yRandom - 1]].placeable = false;
                tempState[[k, yRandom + 1]].placeable = false;
                //tempState[[k, yRandom]].color = 'yellow';
              }
              successful = true;
            }
          }
        }
      }
    }
  }, []);

  const [playerState, setPlayerState] = useState(tempState2);
  const [compState, setCompState] = useState(tempState);

  const playerLoss = () => {
    setPlayerHeaderMsg("Game Over! Computer wins...");
    setComputerHeaderMsg("");
    setGameComplete(true);
  };
  const computerLoss = () => {
    setPlayerHeaderMsg("Game Over! Player wins!");
    setComputerHeaderMsg("");
    setGameComplete(true);
  };

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
          onWin={computerLoss}
          gameOver={gameComplete}
          playerState={playerState}
          setPlayerState={setPlayerState}
          compState={compState}
          setCompState={setCompState}
        />
        <Game
          isPlayer={false}
          //interactions between players:
          onLoss={computerLoss}
          onWin={playerLoss}
          gameOver={gameComplete}
          playerState={playerState}
          setPlayerState={setPlayerState}
          compState={compState}
          setCompState={setCompState}
        />
      </div>
      <div>
        <Ship size={5} name={"Carrier"} />
        <Ship size={4} name={"Battleship"} />
        <Ship size={3} name={"Cruiser"} />
        <Ship size={3} name={"Submarine"} />
        <Ship size={2} name={"Destroyer"} />
      </div>
    </>
  );
}

export default App;
