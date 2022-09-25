import React from "react";
import "./PortionBar.css";

function PortionBar({ value, name, perDayMin, perDayMax }) {
  return (
    <div className="PortionBar">
      <div className="circles">
        {new Array(perDayMin * 2).fill(null).map((_, circleIndex) => (
          <div
            className={`circle-half  circle-${
              circleIndex % 2 === 0 ? "left" : "right"
            } ${value > circleIndex ? `circle-${name}` : ""} `}
          />
        ))}
        {new Array((perDayMax - perDayMin) * 2)
          .fill(null)
          .map((_, circleIndex) => (
            <div
              className={`circle-half circle-bonus circle-${
                circleIndex % 2 === 0 ? "left" : "right"
              } ${value > circleIndex + perDayMin * 2 ? `circle-${name}` : ""}`}
            />
          ))}
      </div>
    </div>
  );
}

export default React.memo(PortionBar);
