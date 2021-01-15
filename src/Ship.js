import React from "react";
import './Ship.css';

function Ship(props) {

const dragStartHandler = (size) => (e) => {
  e.dataTransfer.setData(String(size), size);
  //e.dataTransfer.effectAllowed = "move";
}

const dragEndHandler = (e) => {
  if (e.dataTransfer.dropEffect === "move") {
    e.target.style.display = "none";
  }
}

  return (
    <div className="ship" draggable="true" onDragEnd={dragEndHandler} onDragStart={dragStartHandler(props.glength)} style={{height: 75, width:(100*props.glength)}}>
        TEST
    </div>
  );
}

export default Ship;