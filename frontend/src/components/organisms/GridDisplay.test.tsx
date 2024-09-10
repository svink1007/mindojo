import React from 'react';
import { render } from '@testing-library/react';
import GridDisplay from './GridDisplay';

describe('GridDisplay', () => {
  it('should render grid and highlight flow coordinates', () => {
    const result = {
      count: 2,
      coordinates: [[0, 1], [1, 2]] as [number, number][],  // Ensure the coordinates are tuples
      grid: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    };
    
    const { container } = render(<GridDisplay result={result} />);

    const highlightedCells = container.querySelectorAll('.in-flow');
    expect(highlightedCells.length).toBe(2);
  });
});
