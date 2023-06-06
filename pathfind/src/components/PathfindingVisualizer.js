import Grid from "./Grid"
import AlgorithmConfigHub from "./HeaderComponents/AlgorithmConfigHub";
import SettingsHub from "./HeaderComponents/SettingsHub";
import WeightPickerHub from "./HeaderComponents/WeightPickerHub";
import GridTypesHub from "./HeaderComponents/GridTypesHub";
import { Button } from "@mantine/core";
import { useState, useRef, useReducer } from "react"
import { updateNeighbors } from "./helpers/gridHelperFunctions";
// import { reducer, initialState} from "../reducers";
const INITIAL_HEAURISTIC = "Manhattan"
const INITIAL_CELLTYPE = "Wall"
const INITIAL_SPEEDTYPE = "Fast"
const INITIAL_HEAURISTIC_WEIGHT = 1.001
const START_CELL_COORDS = [1, 1];
const GOAL_CELL_COORDS = [15, 35];
const PathfindingVisualizer = () => {

    const [grid, setGrid] = useState([]);
    const [selectedAlgorithm, setAlgorithm] = useState("")
    const [selectedGridType, setGridType] = useState("")
    const [selectedHeuristic, setHeuristic] = useState(INITIAL_HEAURISTIC)
    const [selectedCellType, setCellType] = useState(INITIAL_CELLTYPE)
    const [selectedSpeedType, setSpeedType] = useState(INITIAL_SPEEDTYPE)
    const [diagonalMovement, setDiagonalMovement] = useState(false)
    const [selectedHeuristicWeight, setHeuristicWeight] = useState(INITIAL_HEAURISTIC_WEIGHT)
    const [clearedGrid, setClearedGrid] = useState(false)
    const [clearObstacles, setClearedObstacles] = useState(false)
    const [startCell, setStartCell] = useState(START_CELL_COORDS)
    const [goalCell, setGoalCell] = useState(GOAL_CELL_COORDS)
    let copiedGrid = useRef(null)
    const handleAlgorithmChange = (algo) => {
        setAlgorithm(algo)
    }
    const handleGridTypeChange = (gridType) => {
        setGridType(gridType)
    }
    const handleCellChange = (cellType) => {
        setCellType(cellType)
    }

    const handleHeuristicChange = (heuristic) => {
        setHeuristic(heuristic)
    }

    const handleSpeedChange = (speedType) => {
        setSpeedType(speedType)
    }



    const handleCopyGrid = async () => {
        let formattedString = grid.map(row => row.map(cell => JSON.stringify(cell)).join('\t')).join('\n');
        formattedString = selectedAlgorithm + "}" + formattedString
        await navigator.clipboard.writeText(formattedString)
    }

    const handlePasteGrid = async () => {
        const text = await navigator.clipboard.readText()
        try {

            const objectStrings = text.split('}');
            const validObjectStrings = objectStrings.slice(1).filter(Boolean).map(objectString => objectString.trim() + '}');
            const objects = validObjectStrings.map(objectString => JSON.parse(objectString));
            const formattedArray = [];
            let row = []
            for (let i = 0; i < 1000; i++) {
                const cell = objects[i]
                cell.weight = cell.weight === null ? Infinity : cell.weight
                row.push(objects[i])

                if(cell.isStart) {
                    setStartCell(cell.coords)
                } else if(cell.isGoal){
                    setGoalCell(cell.coords)

                }
                if ((i + 1) % 50 === 0) {
                    formattedArray.push(row)
                    row = []
                }
            }
            updateNeighbors(formattedArray, diagonalMovement)
            setGrid(formattedArray)
            setAlgorithm(objectStrings[0])


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className="config-hub">
                <header>Pathfinding Visualizer</header>
                <AlgorithmConfigHub onAlgorithmChange={handleAlgorithmChange}></AlgorithmConfigHub>
                <GridTypesHub onGridTypeChange={handleGridTypeChange}></GridTypesHub>
                <Button className="config-hub-elements" onClick={() => setClearedGrid(true)}>Clear Board</Button>
                <Button className="config-hub-elements" onClick={() => setClearedObstacles(true)}>Clear Obstacles</Button>
                <WeightPickerHub onCellTypeChange={handleCellChange} className="config-hub-elements">Weight Picker</WeightPickerHub>
                <SettingsHub
                    selectedHeuristic={selectedHeuristic}
                    selectedHeuristicWeight={selectedHeuristicWeight}
                    diagonalMovement={diagonalMovement}
                    selectedSpeedType={selectedSpeedType}
                    copiedGrid={copiedGrid}
                    onHeuristicChange={handleHeuristicChange}
                    onMovementChange={() => setDiagonalMovement(!diagonalMovement)}
                    onSpeedChange={handleSpeedChange}
                    onHeuristicWeightChange={(heuristicWeight) => setHeuristicWeight(heuristicWeight)}
                    onCopyGrid={handleCopyGrid}
                    onPasteGrid={handlePasteGrid}>
                </SettingsHub>
            </div>

            <Grid
                grid={grid}
                startCell={startCell}
                goalCell={goalCell}
                setGoalCell={setGoalCell}
                setStartCell={setStartCell}
                selectedAlgorithm={selectedAlgorithm}
                selectedCellType={selectedCellType}
                selectedGridType={selectedGridType}
                selectedHeuristicWeight={selectedHeuristicWeight}
                selectedHeuristic={selectedHeuristic}
                selectedSpeedType={selectedSpeedType}
                clearedGrid={clearedGrid}
                clearObstacles={clearObstacles}
                diagonalMovement={diagonalMovement}
                setGrid={setGrid}
                resetGridType={() => setGridType("")}
                resetSelectedAlgorithm={() => setAlgorithm("")}
                resetClearedGrid={() => setClearedGrid(false)}
                resetClearedObstacles={() => setClearedObstacles(false)}
            ></Grid>
        </div >


    )

}

export default PathfindingVisualizer