import uniqid from 'uniqid'
export const UP = [-1, 0]; export const DOWN = [1, 0]; export const LEFT = [0, -1]; export const RIGHT = [0, 1];
export const UNWEIGHTED = "Unweighted"; export const WATER = "Water"; export const SAND = "Sand"; export const FOREST = "Forest";
const UP_LEFT = [-1, -1];
const UP_RIGHT = [-1, 1];
const DOWN_LEFT = [1, -1];
const DOWN_RIGHT = [1, 1];
const diagonalDirections = [RIGHT, UP, LEFT, DOWN, DOWN_RIGHT, UP_RIGHT, DOWN_LEFT, UP_LEFT];
const orthogonalDirections = [RIGHT, UP, DOWN, LEFT];

export const initializeGrid = (startCell, goalCell, diagonalMovement) => {
    let initialGrid = []
    for (let r = 0; r < 20; r++) {
        const row = []
        for (let c = 0; c < 50; c++) {
            const cell = {
                id: uniqid(),
                coords: [r, c],
                weightType: UNWEIGHTED,
                isStart: false,
                isGoal: false,
                weight: 1,
                partOfPath: false,
                searched: false,
                clickedAnimation: false,
                pathAnimation: false,
                neighbors: []
            }
            row.push(cell)
        }
        initialGrid.push(row)
    }
    const [startRow, startCol] = startCell
    initialGrid[startRow][startCol].isStart = true
    initialGrid[startRow][startCol].weight = 1
    initialGrid[startRow][startCol].weightType = UNWEIGHTED

    const [goalRow, goalCol] = goalCell
    initialGrid[goalRow][goalCol].isGoal = true
    initialGrid[goalRow][goalCol].weight = 1
    initialGrid[goalRow][goalCol].weightType = UNWEIGHTED

    updateNeighbors(initialGrid, diagonalMovement);
    return initialGrid
}
export const updateNeighbors = (grid, diagonalMovement) => {
    let directions;
    if (diagonalMovement) {
        directions = diagonalDirections
    } else {
        directions = orthogonalDirections
    }
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
                cell.neighbors.push(grid[row][col].id)
            }

        }
    }
}

export const findNeighbor = (r, c, neighborId, grid) => {
    for (const [dr, dc] of diagonalDirections) {
        const row = r + dr
        const col = c + dc
        if (row >= grid.length || row < 0 || col >= grid[0].length || col < 0) {
            continue
        }

        if(grid[row][col].id === neighborId){
            return grid[row][col]
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

export const updateCellType = (currentCellType, newCellType, currentWeightValue) => {
    let weightType = ""
    let weightValue = 1
    if (newCellType === "Wall") {
        weightType = currentCellType !== "Wall" ? "Wall" : UNWEIGHTED;
        weightValue = currentWeightValue !== Infinity ? Infinity : 1;
    } else if (newCellType === SAND) {
        weightType = currentCellType !== SAND ? SAND : UNWEIGHTED;
        weightValue = currentWeightValue !== 5 ? 5 : 1;
    } else if (newCellType === WATER) {
        weightType = currentCellType !== WATER ? WATER : UNWEIGHTED;
        weightValue = currentWeightValue !== 10 ? 10 : 1;
    } else if (newCellType === FOREST) {
        weightType = currentCellType !== FOREST ? FOREST : UNWEIGHTED;
        weightValue = currentWeightValue !== 50 ? 50 : 1;
    }
    return [weightType, weightValue]

}

export const reconstructPath = (goalCell, cameFrom) => {
    let path = [];
    let current = cameFrom[JSON.stringify(goalCell)];
    while (current !== undefined && current !== null) {
        path.unshift(current.coords);
        current = cameFrom[JSON.stringify(current.coords)];
    }
    return path
}

export const serializeArray = (arr) => {
    return JSON.stringify(arr);
}

export const setAnimationSpeed = (speedType) => {
    if (speedType === "Fast") {
        return 10
    } else if (speedType === "Medium") {
        return 70
    } else {
        return 300
    }
}