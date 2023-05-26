/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import uniqid from 'uniqid'
import Cell from "./Cell";
import DijkstraAlgo from "../algorithms/Dijkstra";
const initializeGrid = (startCell, goalCell) => {
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
                moving: false,
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

    insertNeighbors(initialGrid);
    return initialGrid
}
const insertNeighbors = (grid) => {
    const directions = [[1, 0], [0, 1], [0, -1], [-1, 0]];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            const cell = grid[r][c]
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

const Grid = ({ selectedAlgorithm }) => {
    // const [algorithm, setAlgorithm] = useState(null);
    const [startCell, setStartCell] = useState([10, 25])
    const [goalCell, setGoalCell] = useState([10, 30])
    const [grid, setGrid] = useState(initializeGrid(startCell, goalCell))
    const [clickedWaypoint, setClickedWaypoint] = useState([false, false]);
    let throttledMoveWaypoints = null;
    const handleClick = ([row, col]) => {
        if (row === goalCell[0] && col === goalCell[1]) {
            setClickedWaypoint([clickedWaypoint[0], true])
            return
        } else if (row === startCell[0] && col === startCell[1]) {
            setClickedWaypoint([true, clickedWaypoint[1]])
            return
        }

        const newGrid = grid.map((row) => [...row]);
        const cell = newGrid[row][col]
        cell.wall = !cell.wall;
        cell.weight = Infinity
        newGrid[row][col] = cell
        setGrid(newGrid)
    };

    const updateAlgoPath = (cameFrom) => {
        if (cameFrom === null) {
            console.log('NO PATH')
            return
        }
        let current = cameFrom[JSON.stringify(goalCell)]

        const newGrid = grid.map((row) => [...row]);
        while (current) {
            const { coords } = current
            newGrid[coords[0]][coords[1]].partOfPath = true;
            current = cameFrom[JSON.stringify(current.coords)]
        }
        setGrid(newGrid)

    }

    const handleMoveWaypoints = (event) => {
        const cell = event.target;
        if (!cell.parentNode) {
            return
        }
        const row = cell.parentNode.rowIndex;
        const col = cell.cellIndex;
        const newGrid = grid.map((row) => [...row]);
        if ((row === undefined || col === undefined) || (grid[row][col].wall)) {
            return
        }
        if (clickedWaypoint[0]) {
            const [oldStartRow, oldStartCol] = startCell;
            if (row === oldStartRow && col === oldStartCol) {
                return;
            }
            newGrid[oldStartRow][oldStartCol].isStart = false;
            newGrid[row][col].isStart = true;
            newGrid[row][col].moving = true;
            setStartCell([row, col]);
            setGrid(newGrid);

        } else if (clickedWaypoint[1]) {
            const [oldGoalRow, oldGoalCol] = goalCell;
            if (row === oldGoalRow && col === oldGoalCol) {
                return;
            }
            newGrid[oldGoalRow][oldGoalCol].isGoal = false;
            newGrid[row][col].isGoal = true;
            setGoalCell([row, col]);
            setGrid(newGrid);
        }

    };

    const handleMoveWaypointsThrottled = (event) => {
        if (throttledMoveWaypoints) {
            return;
        }

        throttledMoveWaypoints = setTimeout(() => {
            handleMoveWaypoints(event);
            throttledMoveWaypoints = null;
        }, 0);
    };
    
    const setWayPoint = () => {
        if (clickedWaypoint[0] || clickedWaypoint[1]) {
            setClickedWaypoint([false, false])

        }
    }
    const handleStartPath = () => {
        let cameFrom;
        if (selectedAlgorithm === "Dijkstra's Algorithm") {
            cameFrom = DijkstraAlgo(startCell, grid);
        } else {
            return;
        }
        updateAlgoPath(cameFrom);
    };

    return (
        <div>
            <button onClick={handleStartPath}></button>
            <table
                className="grid"
                onMouseMove={handleMoveWaypointsThrottled}
                onMouseDown={setWayPoint}
            >
                <tbody>
                    {grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell) => (
                                <Cell
                                    key={uniqid()}
                                    cell={cell}
                                    handleClick={handleClick}
                                ></Cell>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


}



export default Grid;
