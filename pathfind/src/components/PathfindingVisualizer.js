import Grid from "./Grid"
import Header from "./HeaderComponents/Header"
import { useState } from "react"
const PathfindingVisualizer = () => {
    const [algorithm, setAlgorithm] = useState("")
    const [gridType, setGridType] = useState("")
    const [clearedGrid, setClearedGrid] = useState(false)
    const [clearObstacles, setClearObstacles] = useState(false)
    const [selectedCellType, setCellTypee] = useState("Wall")
    const handleAlgorithmChange = (algo) => {
        setAlgorithm(algo)
    }
    const handleGridTypeChange = (gridType) => {
        setGridType(gridType)
    }
    const handleCellChange = (cellType) => {
        setCellTypee(cellType)
    }

    return (
        <div>
            <Header
                handleAlgorithmChange={handleAlgorithmChange}
                handleGridTypeChange={handleGridTypeChange}
                handleClearGrid={() => setClearedGrid(true)}
                handleClearObstacles={() => setClearObstacles(true)}
                handleCellChange={handleCellChange}
            ></Header>
            <Grid 
                selectedAlgorithm={algorithm}
                selectedCellType={selectedCellType}
                selectedGridType={gridType}
                clearedGrid={clearedGrid}
                clearObstacles={clearObstacles}
                resetGridType ={() => setGridType("")}
                resetSelectedAlgorithm={() => setAlgorithm("")}
                resetClearedGrid={() => setClearedGrid(false)}
                resetClearedObstacles={() => setClearObstacles(false)}
            ></Grid>
        </div>



    )

}

export default PathfindingVisualizer