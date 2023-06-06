import { serializeArray } from "../components/helpers/gridHelperFunctions"
const BFSAlgo = (startNode, goalNode, grid) => {
    let cameFrom = {[serializeArray(startNode)]: null }
    let searchedCells = []
    const [row, col] = startNode
    const startCell = grid[row][col]
    let queue = [startCell]
    while (queue.length !== 0) {
        const current = queue.shift()
        searchedCells.push(current.coords)
        if (current.isGoal) {
            return [cameFrom, searchedCells];
        }
        current.neighbors.forEach(neighbor => {
            const neighboorCoords = serializeArray(neighbor.coords)
            if (neighbor.weight !== Infinity && !(neighboorCoords in cameFrom)) {
                queue.push(neighbor)
                cameFrom[neighboorCoords] = current
            }
        });
    }
    return [cameFrom, searchedCells]
}
export default BFSAlgo




