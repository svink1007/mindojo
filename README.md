
# Island Water Flow Analysis

This project determines the number of grid cells in various topographical scenarios where water can flow to both the northwest and southeast edges of an island. The grid data is provided via a Google Sheet, and the system calculates and displays the water flow analysis.

## Project Setup

### Backend

#### Prerequisites
- Node.js (v14.x or higher)
- Google Cloud Service Account with access to Google Sheets API

#### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/svink1007/mindojo.git
    cd mindojo
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following environment variables:
    ```
    GOOGLE_SHEET_ID=your_google_sheet_id
    GOOGLE_API_KEY=your_google_api_key
    ```

4. Run the backend:
    ```bash
    npm run start
    ```

#### API Endpoints
- `GET /get-tabs`: Retrieves all the sheet/tab names from the Google Sheet.
- `POST /calculate-flow`: Receives a tab (sheet) name, fetches the corresponding grid data from the Google Sheet, and returns the water flow result, which includes:
    - `count`: The number of cells from which water can flow to both the northwest and southeast edges.
    - `coordinates`: The coordinates of these cells.
    - `grid`: The original grid data.

### Frontend

#### Prerequisites
- Node.js (v14.x or higher)

#### Steps

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Run the frontend:
    ```bash
    npm start
    ```

   The application should now be available at `http://localhost:3000`.

## Key Algorithms

### `calculateWaterFlow(grid: number[][]): { count: number; coordinates: number[][]; grid: number[][] }`

#### **Explanation:**

This function calculates which cells in the grid allow water to flow to **both the northwest and southeast edges** of the island.

1. **Grid Size Initialization**: The function first determines the number of rows and columns in the grid.

2. **Flow Reachability Calculation**:
   - It computes two sets of reachable cells:
     - **northwestReachable**: Cells from which water can flow to the northwest corner of the grid.
     - **southeastReachable**: Cells from which water can flow to the southeast corner of the grid.
   - These reachable sets are computed using the helper function `flowReachable`, which performs a depth-first search (DFS) starting from the edges of the grid and explores the neighboring cells that allow water to flow downward (i.e., from higher or equal height to lower or equal height).

3. **Intersecting Reachable Cells**:
   - The function intersects the two sets of reachable cells to find the **cells that allow water to flow to both the northwest and southeast edges**.

4. **Return Result**:
   - The function returns the count of such cells, the list of their coordinates, and the original grid.

### `flowReachable(grid: number[][], rows: number, cols: number, direction: string): number[][]`

#### **Explanation:**

This function calculates the cells that can flow to either the northwest or southeast edge.

1. **Reachable Set Initialization**: A `Set` is used to store the coordinates of the cells that can reach either the northwest or southeast edges. Using a `Set` ensures that coordinates are unique.

2. **Starting Points**: Based on the direction, the algorithm initializes a list of starting points for the DFS:
   - **northwest direction**: The starting points are the cells in the **top row** (row 0) and **leftmost column** (column 0).
   - **southeast direction**: The starting points are the cells in the **bottom row** (last row) and **rightmost column** (last column).

3. **DFS Traversal**: A depth-first search is performed to explore all neighboring cells from each starting point. The DFS checks whether the neighboring cells have a height less than or equal to the current cell (i.e., the water can flow downhill or remain at the same level).

4. **Storing Reachable Coordinates**: The function stores the coordinates of all reachable cells in a `Set`. After the DFS is completed, the set is converted into an array of coordinate pairs.

5. **Return Reachable Coordinates**: The function returns the array of reachable cell coordinates.

---