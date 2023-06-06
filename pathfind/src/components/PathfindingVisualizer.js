import Grid from "./Grid"
import AlgorithmConfigHub from "./HeaderComponents/AlgorithmConfigHub";
import SettingsHub from "./HeaderComponents/SettingsHub";
import WeightPickerHub from "./HeaderComponents/WeightPickerHub";
import GridTypesHub from "./HeaderComponents/GridTypesHub";
import { Button } from "@mantine/core";
import { useState, createContext } from "react"
export const MyContext = createContext();
const PathfindingVisualizer = () => {
    const [selectedAlgorithm, setAlgorithm] = useState("")
    const [selectedGridType, setGridType] = useState("")
    const [selectedHeuristic, setHeuristic] = useState("Manhattan")
    const [selectedCellType, setCellType] = useState("Wall")
    const [selectedSpeedType, setSpeedType] = useState("Fast")
    const [diagonalMovement, setDiagonalMovement] = useState(false)

    const [clearedGrid, setClearedGrid] = useState(false)
    const [clearObstacles, setClearObstacles] = useState(false)
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
    return (
        <div>
            <div className="config-hub">
            <header>Pathfinding Visualizer</header>
                <AlgorithmConfigHub onAlgorithmChange={handleAlgorithmChange}></AlgorithmConfigHub>
                <GridTypesHub onGridTypeChange={handleGridTypeChange}></GridTypesHub>
                <Button className="config-hub-elements" onClick={() => setClearedGrid(true)}>Clear Board</Button>
                <Button className="config-hub-elements" onClick={() => setClearObstacles(true)}>Clear Obstacles</Button>
                <WeightPickerHub onCellTypeChange={handleCellChange} className="config-hub-elements">Weight Picker</WeightPickerHub>
                <SettingsHub
                    selectedHeuristic={selectedHeuristic}
                    diagonalMovement={diagonalMovement}
                    selectedSpeedType = {selectedSpeedType}
                    onHeuristicChange={handleHeuristicChange}
                    onMovementChange={() => setDiagonalMovement(!diagonalMovement)}
                    onSpeedChange={handleSpeedChange}>
                </SettingsHub>
            </div>

            <Grid
                selectedAlgorithm={selectedAlgorithm}
                selectedCellType={selectedCellType}
                selectedGridType={selectedGridType}
                selectedHeuristic={selectedHeuristic}
                selectedSpeedType={selectedSpeedType}
                clearedGrid={clearedGrid}
                clearObstacles={clearObstacles}
                diagonalMovement={diagonalMovement}
                resetGridType={() => setGridType("")}
                resetSelectedAlgorithm={() => setAlgorithm("")}
                resetClearedGrid={() => setClearedGrid(false)}
                resetClearedObstacles={() => setClearObstacles(false)}
            ></Grid>
        </div >


    )

}

export default PathfindingVisualizer