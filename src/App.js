import React from "react";
import Game from "./Game";
import Ship from "./Ship";
import './App.css';

function App() {
  return (
    <>
    <div className="board">
      <Game />
      <Game />
    </div>
    <Ship glength={600}/>
    </>
  );
}

export default App;