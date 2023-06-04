const HORIZONTAL = "HORIZONTAL";
const VERTICAL = "VERTICAL";

const RecursiveDivisionAlgo = (grid, r, c, width, height, orientation) => {
    if (width <= 3 || height <= 3) {
        return grid;
    }

    const horizontal = orientation === HORIZONTAL;
    let wc = c + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)));
    let wr = r + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0);
    let pc = wc + (horizontal ? Math.floor(Math.random() * width) : 0);
    let pr = wr + (horizontal ? 0 : Math.floor(Math.random() * height));
    wc = wc - (wc % 2 === 0 ? 0 : 1);
    wr = wr - (wr % 2 === 0 ? 0 : 1);
    pc = Math.max(pc - (pc % 2 !== 0 ? 0 : 1), 1);
    pr = Math.max(pr - (pr % 2 !== 0 ? 0 : 1), 1);
    if (horizontal) {
        for (let col = wc; col < wc + width; col++) {
            if (col === pc || grid[wr][col].isStart || grid[wr][col].isGoal) {
                continue;
            }
            grid[wr][col] = { ...grid[wr][col], weightType: "Wall", weight: Infinity };
        }
        if (wr !== 0) {
            grid[wr][pc] = { ...grid[wr][pc], weightType: "Unweighted", weight: 1 };
        }
        RecursiveDivisionAlgo(grid, r, c, width, wr - r + 1, chooseOrientation(width, wr - r + 1));
        RecursiveDivisionAlgo(grid, wr + 1, c, width, r + height - wr - 1, chooseOrientation(width, r + height - wr - 1));
    } else {
        for (let row = wr; row < wr + height; row++) {
            if (row === pr || grid[row][wc].isStart || grid[row][wc].isGoal) {
                continue;
            }
            grid[row][wc] = { ...grid[row][wc], weightType: "Wall", weight: Infinity };
        }

        if (wc !== 0) {
            grid[pr][wc] = { ...grid[pr][wc], weightType: "Unweighted", weight: 1 };
        }

        RecursiveDivisionAlgo(grid, r, c, wc - c + 1, height, chooseOrientation(wc - c + 1, height));
        RecursiveDivisionAlgo(grid, r, wc + 1, c + width - wc - 1, height, chooseOrientation(c + width - wc - 1, height));
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
