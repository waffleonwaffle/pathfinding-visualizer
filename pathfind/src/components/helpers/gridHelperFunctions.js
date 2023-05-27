import uniqid from 'uniqid'
const UP = [-1, 0];
const DOWN = [1, 0];
const LEFT = [0, -1];
const RIGHT = [0, 1];
const UP_LEFT = [-1, -1];
const UP_RIGHT = [-1, 1];
const DOWN_LEFT = [1, -1];
const DOWN_RIGHT = [1, 1];
 
export const initializeGrid = (startCell, goalCell) => {
    const initialGrid = []
    for (let r = 0; r < 20; r++) {
        const row = []
        for (let c = 0; c < 50; c++) {
            const cell = {
                id: uniqid(),
                coords: [r, c],
                wall: false,
                isStart: false,
                isGoal: false,
                weight: 1,
                partOfPath: false,
                searched: false,
                neighbors: []
            }
            row.push(cell)
        }
        initialGrid.push(row)
    }

    const [startRow, startCol] = startCell
    initialGrid[startRow][startCol].isStart = true

    const [goalRow, goalCol] = goalCell
    initialGrid[goalRow][goalCol].isGoal = true

    updateNeighbors(initialGrid);
    return initialGrid
}
export const updateNeighbors = (grid) => {
    const directions = [RIGHT, UP, LEFT, DOWN];
    // const diagonalDirections = [RIGHT, UP, LEFT, DOWN, DOWN_RIGHT, UP_RIGHT, DOWN_LEFT, UP_LEFT];

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            const cell = grid[r][c]
            cell.neighbors = []
            for (const [dr, dc] of directions) {
                const row = r + dr
                const col = c + dc
                if (row >= grid.length || row < 0 || col >= grid[0].length || col < 0) {
                    continue
                }
                cell.neighbors.push(grid[row][col])
            }

        }
    }
}

export const getRowColFromTable = (event) => {
    const cell = event.target;
    if (!cell || !cell.parentNode) {
        return
    }
    const row = cell.parentNode.rowIndex;
    const col = cell.cellIndex;
    if (row === undefined || col === undefined) {
        return
    }

    return [row, col]
}

