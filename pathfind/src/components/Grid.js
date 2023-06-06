/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { Button } from '@mantine/core';
import AlgoStats from "./AlgoStats";
import uniqid from 'uniqid'
import Cell from "./Cell";
import DijkstraAlgo from "../algorithms/Dijkstra";
import AStarAlgo from "../algorithms/AStar";
import DFSAlgo from "../algorithms/DepthFirstSearch";
import GreedyBestFirstAlgo from "../algorithms/GreedyBestFirstSearch";
import BFSAlgo from "../algorithms/BreadthFirstSearch";
import RecursiveDivisionAlgo from "../algorithms/MazeGeneration/RecursiveDivision";
import RandomWeightMaze from "../algorithms/MazeGeneration/RandomWeightMaze";
import { reconstructPath, getRowColFromTable, initializeGrid, updateAllNeighbors, updateCellType, setAnimationSpeed } from "./helpers/gridHelperFunctions";

const Grid = ({
    selectedAlgorithm,
    selectedGridType,
    selectedCellType,
    selectedHeuristic,
    diagonalMovement,
    selectedSpeedType,
    resetSelectedAlgorithm,
    resetGridType,
    clearedGrid,
    resetClearedGrid,
    clearObstacles,
    resetClearedObstacles
}) => {
    const START_CELL_COORDS = [1, 1];
    const GOAL_CELL_COORDS = [15, 35];
    const [startCell, setStartCell] = useState(START_CELL_COORDS)
    const [goalCell, setGoalCell] = useState(GOAL_CELL_COORDS)
    const [grid, setGrid] = useState([]);
    const [clickedWaypoint, setClickedWaypoint] = useState([false, false]);
    const [placingWalls, setPlacingWalls] = useState(false);
    const [previousCoordinates, setPreviousCoordinates] = useState([null, null]);
    const [pathRunning, setPathRunning] = useState(false);
    let throttledMoveWaypoints = null;
    let totalVisitedCells = useRef(null)
    let totalExecutionTime = useRef(null)

    useEffect(() => {
        setGrid(initializeGrid(startCell, goalCell, diagonalMovement));
    }, [])
    useEffect(() => {
        if (selectedAlgorithm === "Dijkstra's Algorithm") {
            updateGrid(DijkstraAlgo)
        } else if (selectedAlgorithm === "A* Search") {
            updateGrid(AStarAlgo, selectedHeuristic)
        } else if (selectedAlgorithm === "Greedy best-first Search") {
            updateGrid(GreedyBestFirstAlgo)
        } else if (selectedAlgorithm === "Depth-first Search") {
            updateGrid(DFSAlgo)
        } else if (selectedAlgorithm === "Breadth-first Search") {
            updateGrid(BFSAlgo)
        }
    }, [startCell, goalCell])

    useEffect(() => {
        if (pathRunning) {
            resetClearedGrid()
            resetClearedObstacles()
            return
        }
        if (clearedGrid) {
            setGrid(initializeGrid(START_CELL_COORDS, GOAL_CELL_COORDS))
            resetSelectedAlgorithm()
            resetClearedGrid();
            setStartCell(START_CELL_COORDS)
            setGoalCell(GOAL_CELL_COORDS)
        } else if (clearObstacles) {
            setGrid(prevGrid => {
                const newGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell, weightType: "Unweighted", weight: 1 })))
                resetClearedObstacles()
                return newGrid;
            });
        } else if (selectedGridType === "Random Grid") {
            setGrid(prevGrid => {
                prevGrid = prevGrid.map((row, rowIndex) => row.map((cell, colIndex) => {
                    if (rowIndex === 0 || rowIndex === prevGrid.length - 1 || colIndex === 0 || colIndex === prevGrid[0].length - 1) {
                        return { ...cell, partOfPath: false, searched: false, weightType: "Wall", weight: Infinity }
                    }
                    return { ...cell, partOfPath: false, searched: false, weightType: "Unweighted", weight: 1 }
                }))
                const newGrid = RecursiveDivisionAlgo(prevGrid, 0, 0, prevGrid[0].length - 1, prevGrid.length - 1, "VERTICAL")
                resetGridType()
                return newGrid
            })

        } else if (selectedGridType === "Random Weighted Grid") {
            setGrid(prevGrid => {
                prevGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell, searched: false, partOfPath: false })))
                RandomWeightMaze(prevGrid)
                resetGridType()
                return prevGrid
            })
        }
        setGrid(prevGrid => {
            updateAllNeighbors(prevGrid, diagonalMovement)
            return prevGrid
        });

    }, [clearedGrid, clearObstacles, selectedGridType, diagonalMovement])

    const changeCellType = (row, col) => {
        setGrid(prevGrid => {
            const newGrid = [...prevGrid];
            const clickedCell = { ...newGrid[row][col] };

            const [updatedWeightType, updatedWeightValue] = updateCellType(clickedCell.weightType, selectedCellType, clickedCell.weight)
            if (clickedCell.partOfPath) {
                clickedCell.partOfPath = false
            }
            if (clickedCell.searched) {
                clickedCell.searched = false
            }
            clickedCell.weightType = updatedWeightType
            clickedCell.weight = updatedWeightValue

            clickedCell.clickedAnimation = true;
            setTimeout(() => {
                clickedCell.clickedAnimation = false;
                setGrid([...newGrid]);
            }, 40);
            newGrid[row][col] = clickedCell;
            updateAllNeighbors(newGrid, diagonalMovement);
            return newGrid;
        });
        setPreviousCoordinates([row, col]);
    }

    const animateSearchingCells = (algo, selectedHeuristic = "") => {
        setPathRunning(true);
        const [cameFrom, searchedCells] = algo(startCell, goalCell, grid, selectedHeuristic);
        totalVisitedCells.current = searchedCells.length
        let currentIndex = 1;
        const newGrid = grid.map((row) => row.map((cell) => { return { ...cell, searched: false, partOfPath: false } }))
        const startTime = performance.now();
        const searchingCellsInterval = setInterval(() => {
            if (currentIndex >= searchedCells.length) {
                updateVisualization(cameFrom)
                clearInterval(searchingCellsInterval);
                setGrid(newGrid);
                const endTime = performance.now();
                totalExecutionTime.current = Math.round(endTime - startTime)
                return;
            }
            const searchedCell = searchedCells[currentIndex]
            newGrid[searchedCell[0]][searchedCell[1]].searched = true;
            setGrid([...newGrid]);
            currentIndex++;

        }, setAnimationSpeed(selectedSpeedType));
    };

    const updateVisualization = (cameFrom) => {
        const path = reconstructPath(goalCell, cameFrom)
        if (!path) {
            setPathRunning(false);
            return
        }

        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row) =>
                row.map((cell) => ({ ...cell, partOfPath: false }))
            );
            let index = 0
            const pathVisualizationInterval = setInterval(() => {
                if (index >= path.length) {
                    clearInterval(pathVisualizationInterval)
                    setPathRunning(false);
                    return
                }

                const coords = path[index]
                const cell = newGrid[coords[0]][coords[1]]
                cell.partOfPath = true;
                cell.pathAnimation = true;
                setTimeout(() => {
                    cell.pathAnimation = false;
                    setGrid([...newGrid]);
                }, 30);

                setGrid([...newGrid]);
                index++
            }, setAnimationSpeed(selectedSpeedType))
            return newGrid
        });

    };
    const updateGrid = (algo) => {
        const [cameFrom, searchedCells] = algo(startCell, goalCell, grid, selectedHeuristic);
        const newGrid = grid.map((row) => row.map((cell) => ({ ...cell, searched: false, partOfPath: false })));
        const path = reconstructPath(goalCell, cameFrom)
        if (!path) {
            setGrid(newGrid)
            return
        }
        for (let i = 0; i < searchedCells.length; i++) {
            const searchedCoords = searchedCells[i]
            newGrid[searchedCoords[0]][searchedCoords[1]].searched = true
            const pathCoords = path[i]
            if (pathCoords) {
                newGrid[pathCoords[0]][pathCoords[1]].partOfPath = true
            }
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


        changeCellType(coords[0], coords[1])

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
            changeCellType(row, col)
        } else if (clickedWaypoint[0]) {
            const [oldStartRow, oldStartCol] = startCell;
            if (row === oldStartRow && col === oldStartCol) {
                return;
            }
            newGrid[oldStartRow][oldStartCol].isStart = false;
            newGrid[row][col].isStart = true;
            setStartCell([row, col]);
            updateAllNeighbors(newGrid, diagonalMovement)
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
            updateAllNeighbors(newGrid, diagonalMovement)
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
        }, 20);
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

    const handleStartVisualization = () => {
        totalVisitedCells.current = null
        totalExecutionTime.current = null
        if (pathRunning) {
            return
        }
        if (selectedAlgorithm === "Dijkstra's Algorithm") {
            animateSearchingCells(DijkstraAlgo)
        } else if (selectedAlgorithm === "A* Search") {
            animateSearchingCells(AStarAlgo, selectedHeuristic)
        } else if (selectedAlgorithm === "Greedy best-first Search") {
            animateSearchingCells(GreedyBestFirstAlgo)
        } else if (selectedAlgorithm === "Depth-first Search") {
            animateSearchingCells(DFSAlgo)
        } else if (selectedAlgorithm === "Breadth-first Search") {
            animateSearchingCells(BFSAlgo)
        }
    }


    return (
        <div>
            <div className="visualizer-button-container">
                <Button className="visualizer-button"
                    onClick={handleStartVisualization}>
                    Run {selectedAlgorithm ? selectedAlgorithm : "Visualize Algorithm"}
                </Button>
            </div>
            <div className="grid-container">
                <AlgoStats algorithm={selectedAlgorithm} totalVisitedCells={totalVisitedCells.current} totalExecutionTime={totalExecutionTime.current}></AlgoStats>
                <table
                    className="grid"
                    onClick={handleClickCell}
                    onMouseMove={handleMoveCellsThrottled}
                    onMouseDown={handleMoveWalls}
                    onMouseUp={() => setPlacingWalls(false)}
                >
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

        </div>
    );


}


export default Grid;
