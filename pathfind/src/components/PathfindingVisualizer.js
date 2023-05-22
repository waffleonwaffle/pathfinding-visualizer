import Grid from "./Grid"
import AlgorithmConfigHub from "./AlgorithmConfigHub"
import { selectedAlgorithm } from "./AlgorithmConfigHub"
const PathfindingVisualizer = () => {

    return (
        <div>
            <AlgorithmConfigHub></AlgorithmConfigHub>
            <Grid chosenAlgorithm={selectedAlgorithm}></Grid>
        </div>



    )

}

export default PathfindingVisualizer