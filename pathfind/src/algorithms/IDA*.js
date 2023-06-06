// import PriorityQueue from "../components/helpers/PriorityQueue"
// import { serializeArray } from "../components/helpers/gridHelperFunctions"
// import { calcHeuristicDistance } from './Heuristics'
// const IDAStarAlgo = (startNode, goalNode, grid, heuristicInfo) => {
//     let pQueue = new PriorityQueue()
//     let cameFrom = { [serializeArray(startNode)]: null }
//     let costSoFar = { [serializeArray(startNode)]: 0 }
//     let searchedCells = []
//     const [row, col] = startNode
//     const { heuristic, heuristicWeight } = heuristicInfo
//     const startCell = grid[row][col]
//     const maxFScore = startCell.weight + calcHeuristicDistance(heuristic, heuristicWeight, startNode, goalNode)
//     pQueue.enqueue(startCell, 0)
//     while (!pQueue.isEmpty()) {
//         const current = pQueue.dequeue();
//         searchedCells.push(current.coords)
//         if (current.isGoal) {
//             return [cameFrom, searchedCells];
//         }
//         current.neighbors.forEach(neighbor => {
//             const neighborCoords = serializeArray(neighbor.coords)
//             const pathCost = neighbor.weight + costSoFar[serializeArray(current.coords)]
//             if (neighbor.weight !== Infinity && (!(neighborCoords in costSoFar) || pathCost < costSoFar[neighborCoords])) {
//                 const heuristic_cost = calcHeuristicDistance(heuristic, heuristicWeight, neighbor.coords, goalNode)
//                 const total_cost = pathCost + heuristic_cost
//                 if (total_cost <= maxFScore) {
//                     costSoFar[neighborCoords] = pathCost
//                     pQueue.enqueue(neighbor, total_cost)
//                     cameFrom[neighborCoords] = current
//                 } else {
//                     costSoFar[neighborCoords] = Infinity
//                 }
//             }
//         });
//     }
//     return [cameFrom, searchedCells]
// }


// export default IDAStarAlgo




