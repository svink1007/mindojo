// src/api/gridAPI.ts

// This is a placeholder function. You would replace this with actual API call logic.
export async function fetchGridData(tab: string): Promise<number[][]> {
    // Simulated grid data based on the tab name
    // In practice, replace this with a call to your backend API
    const exampleGrid = [
      [3, 1, 2, 4],
      [3, 1, 3, 4],
      [4, 2, 1, 3],
      [4, 2, 3, 2]
    ]; // A simple hardcoded grid for demonstration
  
    return new Promise(resolve => setTimeout(() => resolve(exampleGrid), 500));
  }
  