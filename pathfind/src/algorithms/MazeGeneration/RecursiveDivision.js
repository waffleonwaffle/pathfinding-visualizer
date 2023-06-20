const HORIZONTAL = "HORIZONTAL";
const VERTICAL = "VERTICAL";

const RecursiveDivisionAlgo = (grid, r, c, width, height, orientation) => {
    if (width <= 3 || height <= 3) {
        return grid;
    }

    const horizontal = orientation === HORIZONTAL;
    let wallStartColumn = c + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)));
    let wallStartRow = r + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0);
    let passageStartColumn = wallStartColumn + (horizontal ? Math.floor(Math.random() * width) : 0);
    let passageStartRow = wallStartRow + (horizontal ? 0 : Math.floor(Math.random() * height));
    wallStartColumn = wallStartColumn - (wallStartColumn % 2 === 0 ? 0 : 1);
    wallStartRow = wallStartRow - (wallStartRow % 2 === 0 ? 0 : 1);
    passageStartColumn = Math.max(passageStartColumn - (passageStartColumn % 2 !== 0 ? 0 : 1), 1);
    passageStartRow = Math.max(passageStartRow - (passageStartRow % 2 !== 0 ? 0 : 1), 1);
    if (horizontal) {
        for (let col = wallStartColumn; col < wallStartColumn + width; col++) {
            if (col === passageStartColumn || grid[wallStartRow][col].isStart || grid[wallStartRow][col].isGoal) {
                continue;
            }
            grid[wallStartRow][col] = { ...grid[wallStartRow][col], weightType: "Wall", weight: Infinity };
        }
        if (wallStartRow !== 0) {
            grid[wallStartRow][passageStartColumn] = { ...grid[wallStartRow][passageStartColumn], weightType: "Unweighted", weight: 1 };
        }
        RecursiveDivisionAlgo(grid, r, c, width, wallStartRow - r + 1, chooseOrientation(width, wallStartRow - r + 1));
        RecursiveDivisionAlgo(grid, wallStartRow + 1, c, width, r + height - wallStartRow - 1, chooseOrientation(width, r + height - wallStartRow - 1));
    } else {
        for (let row = wallStartRow; row < wallStartRow + height; row++) {
            if (row === passageStartRow || grid[row][wallStartColumn].isStart || grid[row][wallStartColumn].isGoal) {
                continue;
            }
            grid[row][wallStartColumn] = { ...grid[row][wallStartColumn], weightType: "Wall", weight: Infinity };
        }

        if (wallStartColumn !== 0) {
            grid[passageStartRow][wallStartColumn] = { ...grid[passageStartRow][wallStartColumn], weightType: "Unweighted", weight: 1 };
        }

        RecursiveDivisionAlgo(grid, r, c, wallStartColumn - c + 1, height, chooseOrientation(wallStartColumn - c + 1, height));
        RecursiveDivisionAlgo(grid, r, wallStartColumn + 1, c + width - wallStartColumn - 1, height, chooseOrientation(c + width - wallStartColumn - 1, height));
    }
    return grid;
};




const chooseOrientation = (width, height) => {
    if (width < height) {
        return HORIZONTAL;
    } else if (height < width) {
        return VERTICAL;
    } else {
        return Math.random() < 0.5 ? HORIZONTAL : VERTICAL;
    }
};

export default RecursiveDivisionAlgo;
