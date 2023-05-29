import Grid from "./Grid"
import Header from "./HeaderComponents/Header"
import { useState } from "react"
const PathfindingVisualizer = () => {
    const [algorithm, setAlgorithm] = useState("")
    const [gridType, setGridType] = useState("")
    const [clearedGrid, setClearedGrid] = useState(false)
    const [clearObstacles, setClearObstacles] = useState(false)

    const handleAlgorithmChange = (algo) => {
        setAlgorithm(algo)
    }
    const handleGridTypeChange = (type) => {
        setGridType(type)
    }
    return (
        <div>
            <Header
                handleAlgorithmChange={handleAlgorithmChange}
                handleGridTypeChange={handleGridTypeChange}
                handleClearGrid={() => setClearedGrid(true)}
                handleClearObstacles={() => setClearObstacles(true)}

            ></Header>
            <Grid 
                selectedAlgorithm={algorithm}
                selectedGridType={gridType}
                clearedGrid={clearedGrid}
                clearObstacles={clearObstacles}
                resetSelectedAlgorithm={() => setAlgorithm("")}
                resetClearedGrid={() => setClearedGrid(false)}
                resetClearedObstacles={() => setClearObstacles(false)}

            ></Grid>
        </div>



    )

}

export default PathfindingVisualizer