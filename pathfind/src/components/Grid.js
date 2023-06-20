/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setStartCell, setGoalCell } from "../reducers/gridReducer";
import uniqid from "uniqid";
import AlgoStats from "./AlgoStats";
import Cell from "./Cell";
import DijkstraAlgo from "../algorithms/Dijkstra";
import AStarAlgo from "../algorithms/AStar";
import DFSAlgo from "../algorithms/DepthFirstSearch";
import GreedyBestFirstAlgo from "../algorithms/GreedyBestFirstSearch";
import BFSAlgo from "../algorithms/BreadthFirstSearch";
import RecursiveDivisionAlgo from "../algorithms/MazeGeneration/RecursiveDivision";
import RandomWeightMaze from "../algorithms/MazeGeneration/RandomWeightMaze";
import IDAStarAlgo from "../algorithms/IDA*";
import {
  reconstructPath,
  getRowColFromTable,
  initializeGrid,
  updateNeighbors,
  updateCellType,
  setAnimationSpeed,
} from "./helpers/gridHelperFunctions";
import {
  resetGridType,
  resetClearedGrid,
  resetClearedObstacles,
  resetClearedPath,
  resetSelectedAlgorithm,
} from "../reducers/pathfindingReducer";
import CopyPaste from "./CopyPaste";
const START_CELL_COORDS = [1, 1];
const GOAL_CELL_COORDS = [15, 35];
const Grid = () => {
  const [grid, setGrid] = useState([]);
  const startCell = useSelector((state) => state.grid.startCell);
  const goalCell = useSelector((state) => state.grid.goalCell);
  const selectedAlgorithm = useSelector(
    (state) => state.pathfind.selectedAlgorithm
  );
  const selectedGridType = useSelector(
    (state) => state.pathfind.selectedGridType
  );
  const selectedCellType = useSelector(
    (state) => state.pathfind.selectedCellType
  );
  const clearedGrid = useSelector((state) => state.pathfind.clearedGrid);
  const clearObstacles = useSelector((state) => state.pathfind.clearObstacles);
  const clearPath = useSelector((state) => state.pathfind.clearPath);
  const selectedHeuristic = useSelector(
    (state) => state.settings.selectedHeuristic
  );
  const selectedSpeedType = useSelector(
    (state) => state.settings.selectedSpeedType
  );
  const selectedHeuristicWeight = useSelector(
    (state) => state.settings.selectedHeuristicWeight
  );
  const diagonalMovement = useSelector(
    (state) => state.settings.diagonalMovement
  );
  const [clickedWaypoint, setClickedWaypoint] = useState([false, false]);
  const [placingWalls, setPlacingWalls] = useState(false);
  const [previousCoordinates, setPreviousCoordinates] = useState([null, null]);
  const [pathRunning, setPathRunning] = useState(false);
  const heuristicObject = {
    heuristic: selectedHeuristic,
    heuristicWeight: selectedHeuristicWeight,
  };
  const dispatch = useDispatch();

  let throttledMoveWaypoints = null;
  let totalVisitedCells = useRef(null);
  let totalExecutionTime = useRef(null);
  let totalPathCost = useRef(0);

  const updateStartCell = (newStartCell) => {
    dispatch(setStartCell(newStartCell));
  };

  const updateGoalCell = (newGoalCell) => {
    dispatch(setGoalCell(newGoalCell));
  };

  useEffect(() => {
    setGrid(initializeGrid(startCell, goalCell, diagonalMovement));
  }, []);
  useEffect(() => {
    if (selectedAlgorithm === "Dijkstra's Algorithm") {
      updateGrid(DijkstraAlgo);
    } else if (selectedAlgorithm === "A* Search") {
      updateGrid(AStarAlgo);
    } else if (selectedAlgorithm === "Greedy best-first Search") {
      updateGrid(GreedyBestFirstAlgo);
    } else if (selectedAlgorithm === "Depth-first Search") {
      updateGrid(DFSAlgo);
    } else if (selectedAlgorithm === "Breadth-first Search") {
      updateGrid(BFSAlgo);
    }
  }, [startCell, goalCell]);

  useEffect(() => {
    if (pathRunning) {
      dispatch(resetClearedGrid());
      dispatch(resetClearedPath());
      dispatch(resetClearedObstacles());
      return;
    }
    if (clearedGrid) {
      setGrid(initializeGrid(START_CELL_COORDS, GOAL_CELL_COORDS));
      dispatch(resetSelectedAlgorithm());
      dispatch(resetClearedGrid());
      resetAlgoStats();
      updateStartCell(START_CELL_COORDS);
      updateGoalCell(GOAL_CELL_COORDS);
    } else if (clearObstacles) {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) =>
          row.map((cell) => ({ ...cell, weightType: "Unweighted", weight: 1 }))
        );
        return newGrid;
      });
      dispatch(resetClearedObstacles());
    } else if (clearPath) {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) =>
          row.map((cell) => ({ ...cell, searched: false, partOfPath: false }))
        );
        return newGrid;
      });
      dispatch(resetClearedPath());
    }
    setGrid((prevGrid) => {
      updateNeighbors(prevGrid, diagonalMovement);
      return prevGrid;
    });
  }, [clearedGrid, clearObstacles, clearPath, diagonalMovement]);

  useEffect(() => {
    resetAlgoStats();
    if (selectedGridType === "Random Grid") {
      setGrid((prevGrid) => {
        prevGrid = prevGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (
              rowIndex === 0 ||
              rowIndex === prevGrid.length - 1 ||
              colIndex === 0 ||
              colIndex === prevGrid[0].length - 1
            ) {
              return {
                ...cell,
                partOfPath: false,
                searched: false,
                weightType: "Wall",
                weight: Infinity,
              };
            }
            return {
              ...cell,
              partOfPath: false,
              searched: false,
              weightType: "Unweighted",
              weight: 1,
            };
          })
        );
        const newGrid = RecursiveDivisionAlgo(
          prevGrid,
          0,
          0,
          prevGrid[0].length - 1,
          prevGrid.length - 1,
          "VERTICAL"
        );
        return newGrid;
      });
      dispatch(resetGridType());
    } else if (selectedGridType === "Random Weighted Grid") {
      setGrid((prevGrid) => {
        prevGrid = prevGrid.map((row) =>
          row.map((cell) => ({ ...cell, searched: false, partOfPath: false }))
        );
        RandomWeightMaze(prevGrid);
        return prevGrid;
      });
      dispatch(resetGridType());
    }
  }, [selectedGridType]);

  const changeCellType = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const clickedCell = { ...newGrid[row][col] };

      const [updatedWeightType, updatedWeightValue] = updateCellType(
        clickedCell.weightType,
        selectedCellType,
        clickedCell.weight
      );
      if (clickedCell.partOfPath) {
        clickedCell.partOfPath = false;
      }
      if (clickedCell.searched) {
        clickedCell.searched = false;
      }
      clickedCell.weightType = updatedWeightType;
      clickedCell.weight = updatedWeightValue;
      clickedCell.clickedAnimation = true;
      setTimeout(() => {
        clickedCell.clickedAnimation = false;
        setGrid([...newGrid]);
      }, 30);
      newGrid[row][col] = clickedCell;
      updateNeighbors(newGrid, diagonalMovement);
      return newGrid;
    });
    setPreviousCoordinates([row, col]);
  };

  const animateSearchingCells = (algo, heuristicInfo = {}) => {
    setPathRunning(true);
    const [cameFrom, searchedCells] = algo(
      grid,
      startCell,
      goalCell,
      heuristicInfo
    );
    totalVisitedCells.current = searchedCells.length;
    let currentIndex = 1;
    const newGrid = grid.map((row) =>
      row.map((cell) => {
        return { ...cell, searched: false, partOfPath: false };
      })
    );
    const startTime = performance.now();
    const searchingCellsInterval = setInterval(() => {
      if (currentIndex >= searchedCells.length) {
        const endTime = performance.now();
        updateVisualization(cameFrom);
        clearInterval(searchingCellsInterval);
        setGrid(newGrid);
        totalExecutionTime.current = Math.round(endTime - startTime);
        return;
      }
      const searchedCell = searchedCells[currentIndex];
      newGrid[searchedCell[0]][searchedCell[1]].searched = true;
      setGrid([...newGrid]);
      currentIndex++;
    }, setAnimationSpeed(selectedSpeedType));
  };

  const updateVisualization = (cameFrom) => {
    const path = reconstructPath(goalCell, cameFrom);
    if (!path) {
      setPathRunning(false);
      return;
    }

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) =>
        row.map((cell) => ({ ...cell, partOfPath: false }))
      );
      let index = 0;
      const pathVisualizationInterval = setInterval(() => {
        if (index >= path.length) {
          clearInterval(pathVisualizationInterval);
          setPathRunning(false);
          return;
        }

        const coords = path[index];
        const cell = newGrid[coords[0]][coords[1]];
        cell.partOfPath = true;
        cell.pathAnimation = true;
        setTimeout(() => {
          cell.pathAnimation = false;
          setGrid([...newGrid]);
        }, 30);
        totalPathCost.current += cell.weight;
        setGrid([...newGrid]);
        index++;
      }, setAnimationSpeed(selectedSpeedType));
      return newGrid;
    });
  };
  const updateGrid = (algo) => {
    const [cameFrom, searchedCells] = algo(
      grid,
      startCell,
      goalCell,
      heuristicObject
    );
    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, searched: false, partOfPath: false }))
    );
    const path = reconstructPath(goalCell, cameFrom);
    if (!path) {
      setGrid(newGrid);
      return;
    }
    for (let i = 0; i < searchedCells.length; i++) {
      const searchedCoords = searchedCells[i];
      newGrid[searchedCoords[0]][searchedCoords[1]].searched = true;
      const pathCoords = path[i];
      if (pathCoords) {
        newGrid[pathCoords[0]][pathCoords[1]].partOfPath = true;
      }
    }
    setGrid(newGrid);
  };

  const handleClickCell = (event) => {
    const coords = getRowColFromTable(event);
    if (!coords || pathRunning) {
      return;
    }
    if (clickedWaypoint[0] || clickedWaypoint[1]) {
      setClickedWaypoint([false, false]);
      return;
    } else if (coords[0] === goalCell[0] && coords[1] === goalCell[1]) {
      setClickedWaypoint([clickedWaypoint[0], true]);
      return;
    } else if (coords[0] === startCell[0] && coords[1] === startCell[1]) {
      setClickedWaypoint([true, clickedWaypoint[1]]);
      return;
    }

    changeCellType(coords[0], coords[1]);
  };

  const handleMoveCells = (event) => {
    const coords = getRowColFromTable(event);
    if (!coords || pathRunning) {
      return;
    }
    const [row, col] = coords;
    const newGrid = grid.map((row) => [...row]);
    const [prevRow, prevCol] = previousCoordinates;
    if (placingWalls) {
      if (prevRow === row && prevCol === col) {
        return;
      }
      changeCellType(row, col);
    } else if (clickedWaypoint[0]) {
      const [oldStartRow, oldStartCol] = startCell;
      if (row === oldStartRow && col === oldStartCol) {
        return;
      }
      newGrid[oldStartRow][oldStartCol].isStart = false;
      newGrid[row][col].isStart = true;
      updateStartCell([row, col]);
      updateNeighbors(newGrid, diagonalMovement);
      setGrid(newGrid);
    } else if (clickedWaypoint[1]) {
      const [oldGoalRow, oldGoalCol] = goalCell;
      if (row === oldGoalRow && col === oldGoalCol) {
        return;
      }
      newGrid[oldGoalRow][oldGoalCol].isGoal = false;
      newGrid[row][col].isGoal = true;
      updateGoalCell([row, col]);
      updateNeighbors(newGrid, diagonalMovement);
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
  };

  const handleMoveWalls = (event) => {
    const coords = getRowColFromTable(event);
    if (!coords || pathRunning) {
      return;
    }
    if (
      (coords[0] === goalCell[0] && coords[1] === goalCell[1]) ||
      (coords[0] === startCell[0] && coords[1] === startCell[1])
    ) {
      return;
    }
    setPlacingWalls(true);
    handleClickCell(event);
  };

  const resetAlgoStats = () => {
    totalVisitedCells.current = null;
    totalExecutionTime.current = null;
    totalPathCost.current = null;
  };

  const handleStartVisualization = () => {
    resetAlgoStats();
    if (pathRunning) {
      return;
    }
    if (selectedAlgorithm === "Dijkstra's Algorithm") {
      animateSearchingCells(DijkstraAlgo);
    } else if (selectedAlgorithm === "A* Search") {
      animateSearchingCells(AStarAlgo, heuristicObject);
    } else if (selectedAlgorithm === "Greedy best-first Search") {
      animateSearchingCells(GreedyBestFirstAlgo, heuristicObject);
    } else if (selectedAlgorithm === "Depth-first Search") {
      animateSearchingCells(DFSAlgo);
    } else if (selectedAlgorithm === "Breadth-first Search") {
      animateSearchingCells(BFSAlgo);
    } else if (selectedAlgorithm === "IDA*") {
      animateSearchingCells(IDAStarAlgo, heuristicObject);
    }
  };

  return (
    <div>
      {/* {console.log('render')} */}
      <div className="visualizer-button-container">
        <Button
          className="visualizer-button"
          onClick={handleStartVisualization}
        >
          Run {selectedAlgorithm ? selectedAlgorithm : "Visualize Algorithm"}
        </Button>
      </div>
      <CopyPaste
        grid={grid}
        setGrid={setGrid}
        selectedAlgorithm={selectedAlgorithm}
        diagonalMovement={diagonalMovement}
        selectedHeuristic={selectedHeuristic}
        selectedHeuristicWeight={selectedHeuristicWeight}
        selectedSpeedType={selectedSpeedType}
        clearPath={clearPath}
      ></CopyPaste>
      <div className="grid-container">
        <AlgoStats
          algorithm={selectedAlgorithm}
          totalVisitedCells={totalVisitedCells.current}
          totalExecutionTime={totalExecutionTime.current}
          totalPathCost={totalPathCost.current}
        ></AlgoStats>
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
                  <Cell key={uniqid()} cell={cell}></Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grid;
