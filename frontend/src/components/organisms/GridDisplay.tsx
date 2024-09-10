import React from "react";
import './GridDisplay.css';
import { FlowResult } from "../../types";

interface GridDisplayProps {
  result: FlowResult;
}

const GridDisplay: React.FC<GridDisplayProps> = ({ result }) => (
  <div className="grid-container">
    {result.grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((cell, colIndex) => {
          const isInFlow = result.coordinates.some(coord => coord[0] === rowIndex && coord[1] === colIndex);
          return (
            <div key={`${rowIndex}-${colIndex}`} className={`grid-cell ${isInFlow ? 'in-flow' : ''}`}>
              {cell}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

export default GridDisplay;
