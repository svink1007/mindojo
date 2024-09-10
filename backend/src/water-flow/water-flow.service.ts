import { Injectable } from '@nestjs/common';

@Injectable()
export class WaterFlowService {
  calculateWaterFlow(grid: number[][]): { count: number; coordinates: number[][]; grid: number[][] } {
    const rows = grid.length;
    const cols = grid[0].length;

    const northwestReachable = this.flowReachable(grid, rows, cols, 'northwest');
    const southeastReachable = this.flowReachable(grid, rows, cols, 'southeast');

    const flowToBoth = northwestReachable.filter((cell) =>
      southeastReachable.some((s) => s[0] === cell[0] && s[1] === cell[1])
    );

    return {
      count: flowToBoth.length,
      coordinates: flowToBoth,
      grid
    };
  }

  private flowReachable(grid: number[][], rows: number, cols: number, direction: string): number[][] {
    const reachable: Set<string> = new Set();  // To store unique reachable coordinates as a set
  
    // Initialize a direction-based starting point
    let starts = [];
    if (direction === 'northwest') {
      // Add cells from the top row and leftmost column (Northwest border)
      for (let i = 0; i < cols; i++) starts.push([0, i]);  // Top row
      for (let i = 0; i < rows; i++) starts.push([i, 0]);  // Left column
    } else if (direction === 'southeast') {
      // Add cells from the bottom row and rightmost column (Southeast border)
      for (let i = 0; i < cols; i++) starts.push([rows - 1, i]);  // Bottom row
      for (let i = 0; i < rows; i++) starts.push([i, cols - 1]);  // Right column
    }
  
    const dfs = (r: number, c: number) => {
      const key = `${r},${c}`;
      if (reachable.has(key)) return; // Already visited
      reachable.add(key);
  
      const directions = [
        [0, 1], [0, -1],  // Right, Left
        [1, 0], [-1, 0],  // Down, Up
      ];
  
      for (const [dr, dc] of directions) {
        const newRow = r + dr;
        const newCol = c + dc;
        // Check bounds and flow condition (new cell should have equal or lower height)
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] <= grid[r][c]) {
          dfs(newRow, newCol);
        }
      }
    };
  
    // Start DFS from all the edge cells based on the direction
    for (const [r, c] of starts) {
      dfs(r, c);
    }
  
    // Convert reachable set into an array of coordinates
    const reachableCoordinates = Array.from(reachable).map(coord => coord.split(',').map(Number));
  
    return reachableCoordinates;
  }
  
}
