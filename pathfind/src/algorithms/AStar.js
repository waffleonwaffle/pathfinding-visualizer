import PriorityQueue from "../components/helpers/PriorityQueue"
import { serializeArray, findNeighbor } from "../components/helpers/gridHelperFunctions"
import {calcHeuristicDistance} from './Heuristics'
const AStarAlgo = (grid, startNode, goalNode, heuristicInfo) => {
    let pQueue = new PriorityQueue()
    let cameFrom = { [serializeArray(startNode)]: null }
    let costSoFar = { [serializeArray(startNode)]: 0 }
    let searchedCells = []
    const [row, col] = startNode
    const startCell = grid[row][col]
    pQueue.enqueue(startCell, 0)
    while (!pQueue.isEmpty()) {
        const current = pQueue.dequeue();
        searchedCells.push(current.coords)
        if (current.isGoal) {
            return [cameFrom, searchedCells];
        }
        current.neighbors.forEach(neighborId => {
            const [curRow, curCol] = current.coords
            const neighbor = findNeighbor(curRow, curCol, neighborId, grid)

            const neighborCoords = serializeArray(neighbor.coords)
            const pathCost = neighbor.weight + costSoFar[serializeArray(current.coords)]
            if (neighbor.weight !== Infinity && (!(neighborCoords in costSoFar) || pathCost < costSoFar[neighborCoords])) {
                const { heuristic, heuristicWeight } = heuristicInfo
                const heuristic_cost = calcHeuristicDistance(heuristic, heuristicWeight, neighbor.coords, goalNode)
                const total_cost = pathCost + heuristic_cost
                costSoFar[neighborCoords] = pathCost
                pQueue.enqueue(neighbor, total_cost)
                cameFrom[neighborCoords] = current
            }
        });
    }
    return [cameFrom, searchedCells]
}

// const 
export default AStarAlgo




