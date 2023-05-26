import Grid from "./Grid"
import AlgorithmConfigHub from "./AlgorithmConfigHub"
import { useState } from "react"
const PathfindingVisualizer = () => {
    const [algorithm, setAlgorithm] = useState("")

    const handleAlgorithmChange = (algo) => {
        setAlgorithm(algo)
    }
    return (
        <div>
            <AlgorithmConfigHub onAlgorithmChange={handleAlgorithmChange}></AlgorithmConfigHub>
            <Grid selectedAlgorithm={algorithm}></Grid>
        </div>



    )

}

export default PathfindingVisualizer