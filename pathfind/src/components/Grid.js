/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
                clicked: false,
                isStart: false,
                isGoal: false,
                weight: 1,
                partOfPath: false,
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

const Grid = () => {
    const [startCell, setStartCell] = useState([0, 0])
    const [goalCell, setGoalCell] = useState([10, 30])
    const [grid, setGrid] = useState(initializeGrid(startCell, goalCell))

    // useEffect(() => {
    // }, [])

    const updateAlgoPath = (algo) => {
        const cameFrom = algo(startCell, grid)
        if(cameFrom === null){
            return
        }
        let current = cameFrom[JSON.stringify(goalCell)]
        const newGrid = grid.map((row) => [...row]);
        while (current !== null) {
            const { coords } = current
            newGrid[coords[0]][coords[1]].partOfPath = true;
            current = cameFrom[JSON.stringify(current.coords)]
        }
        setGrid(newGrid)

    }
    const handleAddWall = ([row, col]) => {
        const newGrid = grid.map((row) => [...row]);
        const cell = newGrid[row][col]
        cell.clicked = !cell.clicked;
        cell.weight = Infinity
        newGrid[row][col] = cell
        setGrid(newGrid)
        // console.log(grid)

    };

    const handleStartPath = () => {
        updateAlgoPath(DijkstraAlgo)
    }

    return (
        <div>
            <button onClick={handleStartPath}></button>
            <table className='grid'>
                <tbody>
                    {grid.map((row, rowIndex) => <tr key={rowIndex}>
                        {row.map(cell => <Cell key={uniqid()} cell={cell} handleClick={handleAddWall}></Cell>)}</tr>)}
                </tbody>

            </table>
        </div>


    )

}



export default Grid;
