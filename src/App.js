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
    <Ship glength={6}/>
    <Ship glength={4}/>
    </>
  );
}

export default App;