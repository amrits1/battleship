import React from "react";
import './Ship.css';

function Ship(props) {
  return (
    <div className="ship" draggable="true" style={{height: 75, width:props.glength}}>
        TEST
    </div>
  );
}

export default Ship;