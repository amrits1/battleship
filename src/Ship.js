import React from "react";
import './Ship.css';

function Ship(props) {

const dragStartHandler = (size) => (e) => {
  e.dataTransfer.setData(String(size), props.name);
}

const dragEndHandler = (e) => {
  if (e.dataTransfer.dropEffect === "move") {
    e.target.style.display = "none";
    props.shipPlaced();
  }
}

  return (
    <div className="ship" draggable="true" onDragEnd={dragEndHandler} onDragStart={dragStartHandler(props.size)} style={{height: 75, width:(100*props.size)}}>
    </div>
  );
}

export default Ship;