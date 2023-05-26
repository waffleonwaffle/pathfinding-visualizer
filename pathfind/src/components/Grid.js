/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import uniqid from 'uniqid'
import Cell from "./Cell";
import DijkstraAlgo from "../algorithms/Dijkstra";
import { initializeGrid, updateNeighbors } from "./helpers/setupGrid";
const Grid = ({ selectedAlgorithm }) => {
    const [startCell, setStartCell] = useState([0, 0])
    const [goalCell, setGoalCell] = useState([0, 20])
    const [grid, setGrid] = useState(initializeGrid(startCell, goalCell))
    const [clickedWaypoint, setClickedWaypoint] = useState([false, false]);
    let throttledMoveWaypoints = null;
    useEffect(() => {
        if (selectedAlgorithm === "Dijkstra's Algorithm") {
            updateAlgoPath(DijkstraAlgo)
        }
    }, [selectedAlgorithm, startCell, goalCell])
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
        cell.weight = cell.weight === 1 ? Infinity : 1
        newGrid[row][col] = cell
        updateNeighbors(newGrid)
        setGrid(newGrid)
    };

    const updateAlgoPath = (algo) => {
        const cameFrom = algo(startCell, grid)
        if (cameFrom === null) {
            console.log('NO PATH')
            return
        }
        let current = cameFrom[JSON.stringify(goalCell)]

        const newGrid = grid.map((row) => row.map((cell) => { return { ...cell, partOfPath: false } }));
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
            setStartCell([row, col]);
            updateNeighbors(newGrid)
            setGrid(newGrid);
        } else if (clickedWaypoint[1]) {
            const [oldGoalRow, oldGoalCol] = goalCell;
            if (row === oldGoalRow && col === oldGoalCol) {
                return;
            }
            newGrid[oldGoalRow][oldGoalCol].isGoal = false;

            newGrid[row][col].isGoal = true;
            setGoalCell([row, col]);
            updateNeighbors(newGrid)
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
    // const handleStartPath = () => {
    //     let algo;
    //     if (selectedAlgorithm === "Dijkstra's Algorithm") {
    //         algo = DijkstraAlgo;
    //     } else {
    //         return;
    //     }
    //     updateAlgoPath(algo);
    // };

    return (
        <div>
            {/* <button onClick={handleStartPath}></button> */}
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
