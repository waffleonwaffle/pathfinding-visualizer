/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import uniqid from 'uniqid'
import Cell from "./Cell";
import DijkstraAlgo from "../algorithms/Dijkstra";
import AStarAlgo from "../algorithms/AStar";
import GreedyBestFirstAlgo from "../algorithms/GreedyBestFirstSearch";
import { getRowColFromTable } from "./helpers/gridHelperFunctions";
import { initializeGrid, updateNeighbors } from "./helpers/gridHelperFunctions";


const Grid = ({ selectedAlgorithm }) => {
    const START_CELL_COORDS = [10, 15];
    const GOAL_CELL_COORDS = [10, 35];
    const [startCell, setStartCell] = useState(START_CELL_COORDS)
    const [goalCell, setGoalCell] = useState(GOAL_CELL_COORDS)
    const [grid, setGrid] = useState(initializeGrid(startCell, goalCell))
    const [clickedWaypoint, setClickedWaypoint] = useState([false, false]);
    const [placingWalls, setPlacingWalls] = useState(false);
    const [previousCoordinates, setPreviousCoordinates] = useState([null, null]);
    const [pathRunning, setPathRunning] = useState(false);
    let throttledMoveWaypoints = null;
    useEffect(() => {
        if (selectedAlgorithm === "Dijkstra's Algorithm") {
            updateGrid(DijkstraAlgo)
        } else if (selectedAlgorithm === "A* Search") {
            updateGrid(AStarAlgo)
        } else if (selectedAlgorithm === "Greedy best-first Search") {
            updateGrid(GreedyBestFirstAlgo)
        }
    }, [startCell, goalCell])

    const changeCellToWall = (row, col) => {
        setGrid(prevGrid => {
            const newGrid = [...prevGrid];
            const clickedCell = { ...newGrid[row][col] };
            clickedCell.wall = !clickedCell.wall;
            clickedCell.weight = clickedCell.weight === 1 ? Infinity : 1;
            newGrid[row][col] = clickedCell;
            updateNeighbors(newGrid);
            return newGrid;
        });
        setPreviousCoordinates([row, col]);
    }

    const animateSearchingCells = (algo) => {
        setPathRunning(true);
        const [found, cameFrom, searchedCells] = algo(startCell, goalCell, grid);
        let currentIndex = 1;
        const newGrid = grid.map((row) => row.map((cell) => { return { ...cell, searched: false, partOfPath: false } }))
        const searchingCellsInterval = setInterval(() => {
            if (currentIndex >= searchedCells.length) {
                if (found) {
                    updateVisualization(cameFrom)
                }
                clearInterval(searchingCellsInterval);
                setPathRunning(false);
                setGrid(newGrid);
                return;
            }
            const searchedCell = searchedCells[currentIndex]
            newGrid[searchedCell[0]][searchedCell[1]].searched = true;
            setGrid([...newGrid]);
            

            currentIndex++;
        }, 10);
    };


    const updateVisualization = (cameFrom) => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row) =>
                row.map((cell) => ({ ...cell, partOfPath: false }))
            );
            let current = cameFrom[JSON.stringify(goalCell)];
            const path = []
            while (current) {
                const { coords } = current;
                path.push(coords)
                current = cameFrom[JSON.stringify(current.coords)];
            }
            path.reverse()
            let index = 0
            const pathVisualizationInterval = setInterval(() => {
                if (index >= path.length) {
                    clearInterval(pathVisualizationInterval)
                    return
                }
                const cell = path[index]
                newGrid[cell[0]][cell[1]].partOfPath = true;
                setGrid([...newGrid]);
                index++
            }, 30)

            return newGrid
        });

    };

    const updateGrid = (algo) => {
        const [found, cameFrom, searchedCells] = algo(startCell, goalCell, grid);
        const newGrid = grid.map((row) => row.map((cell) => ({ ...cell, searched: false, partOfPath: false })));
        if (!found) {
            setGrid(newGrid)
            return
        }
        for(let i = 0; i < searchedCells.length; i++){
            const [row, col] = searchedCells[i]
            newGrid[row][col].searched = true
        }
        let current = cameFrom[JSON.stringify(goalCell)];
        while (current) {
            const { coords } = current;
            newGrid[coords[0]][coords[1]].partOfPath = true;
            current = cameFrom[JSON.stringify(current.coords)];
        }

        setGrid(newGrid);
    };

    const handleClickCell = (event) => {
        const coords = getRowColFromTable(event)
        if (!coords || pathRunning) {
            return
        }
        if (clickedWaypoint[0] || clickedWaypoint[1]) {
            setClickedWaypoint([false, false])
            return
        } else if (coords[0] === goalCell[0] && coords[1] === goalCell[1]) {
            setClickedWaypoint([clickedWaypoint[0], true])
            return
        } else if (coords[0] === startCell[0] && coords[1] === startCell[1]) {
            setClickedWaypoint([true, clickedWaypoint[1]])
            return
        }

        
        changeCellToWall(coords[0], coords[1])

    };


    const handleMoveCells = (event) => {

        const coords = getRowColFromTable(event)
        if (!coords || pathRunning) {
            return
        }
        const [row, col] = coords
        const newGrid = grid.map((row) => [...row])
        const [prevRow, prevCol] = previousCoordinates
        if (placingWalls) {
            if (prevRow === row && prevCol === col) {
                return
            }
            changeCellToWall(row, col)
        } else if (clickedWaypoint[0]) {
            const [oldStartRow, oldStartCol] = startCell;
            if (row === oldStartRow && col === oldStartCol) {
                return;
            }
            newGrid[oldStartRow][oldStartCol].isStart = false;
            newGrid[row][col].isStart = true;
            setStartCell([row, col]);
            updateNeighbors(newGrid)
            setGrid(newGrid);
        }
        else if (clickedWaypoint[1]) {
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

    const handleMoveCellsThrottled = (event) => {
        if (throttledMoveWaypoints) {
            return;
        }
        throttledMoveWaypoints = setTimeout(() => {
            handleMoveCells(event);
            throttledMoveWaypoints = null;
        }, 10);
    }

    const handleMoveWalls = (event) => {
        const coords = getRowColFromTable(event)
        if (!coords || pathRunning) {
            return
        }
        if ((coords[0] === goalCell[0] && coords[1] === goalCell[1]) || (coords[0] === startCell[0] && coords[1] === startCell[1])) {
            return
        }
        setPlacingWalls(true)
        handleClickCell(event)
    }

    const handleClick = () => {
        if (pathRunning) {
            return
        }
        if (selectedAlgorithm === "Dijkstra's Algorithm") {
            animateSearchingCells(DijkstraAlgo)
        } else if (selectedAlgorithm === "A* Search") {
            animateSearchingCells(AStarAlgo)
        } else if (selectedAlgorithm === "Greedy best-first Search") {
            animateSearchingCells(GreedyBestFirstAlgo)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Visualize Algorithm</button>
            <table
                className="grid"
                onClick={handleClickCell}
                onMouseMove={handleMoveCellsThrottled}
                onMouseDown={handleMoveWalls}
                onMouseUp={() => setPlacingWalls(false)}>
                <tbody>
                    {grid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell) => (
                                <Cell
                                    key={uniqid()}
                                    cell={cell}

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
