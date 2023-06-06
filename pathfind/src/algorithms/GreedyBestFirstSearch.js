import PriorityQueue from "../components/helpers/PriorityQueue"
import { serializeArray, findNeighbor } from "../components/helpers/gridHelperFunctions"
import { calcHeuristicDistance } from "./Heuristics"
const GreedyBestFirstAlgo = (grid, startNode, goalNode, heuristicInfo) => {
    let pQueue = new PriorityQueue()
    let cameFrom = { [serializeArray(startNode)]: null }
    let costSoFar = { [serializeArray(startNode)]: 0 }
    let searchedCells = []
    const [row, col] = startNode
    const startCell = grid[row][col]
    pQueue.enqueue(startCell, startCell.weight)
    while (!pQueue.isEmpty()) {
        const current = pQueue.dequeue();
        searchedCells.push(current.coords)
        if (current.isGoal) {            

            return [cameFrom, searchedCells];
        }
        current.neighbors.forEach(neighborId => {
            const [curRow, curCol] = current.coords
            const { heuristic, heuristicWeight } = heuristicInfo
            const neighbor = findNeighbor(curRow, curCol, neighborId, grid)
            const neighborCoords = serializeArray(neighbor.coords)
            const pathCost = calcHeuristicDistance(heuristic, heuristicWeight, neighbor.coords, goalNode)
            if (neighbor.weight !== Infinity && (!(neighborCoords in costSoFar) || pathCost < costSoFar[neighborCoords])) {
                costSoFar[neighborCoords] = pathCost
                pQueue.enqueue(neighbor, pathCost)
                cameFrom[neighborCoords] = current
            }
        });
    }
    return [cameFrom, searchedCells]
}
export default GreedyBestFirstAlgo




                