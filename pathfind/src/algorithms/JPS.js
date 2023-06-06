// import PriorityQueue from "../components/helpers/PriorityQueue"
// import { serializeArray } from "../components/helpers/gridHelperFunctions"
// const D = 1.001
// const ChebyshevDistanceHeuristic = (a, b) => {
//     const [x1, y1] = a
//     const [x2, y2] = b
//     const dx = Math.abs(x2 - x1)
//     const dy = Math.abs(y2 - y1)
//     const distance = Math.max(dx, dy)
//     return D * distance
// }

// const EuclideanDistanceHeuristic = (a, b) => {
//     const [x1, y1] = a
//     const [x2, y2] = b
//     const dx = Math.abs(x2 - x1)
//     const dy = Math.abs(y2 - y1)
//     const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
//     return D * distance
// }


// const ManhattanDistanceHeuristic = (a, b) => {
//     const [x1, y1] = a
//     const [x2, y2] = b
//     const dx = Math.abs(x2 - x1)
//     const dy = Math.abs(y2 - y1)
//     const distance = dx + dy
//     return D * distance
// }

// const calcHeuristicDistance = (heuristic, a, b) => {
//     switch(heuristic){
//         case "Manhattan":
//             return ManhattanDistanceHeuristic(a, b)
//         case "Euclidean":
//             return EuclideanDistanceHeuristic(a, b)
//         case "Chebyshev":
//             return ChebyshevDistanceHeuristic(a, b)
//         default:
//             break
//     }
// }

// const JPSAlgo = (currentNode, startNode, goalNode) => {
//     let cameFrom = { [serializeArray(startNode)]: null }
//     const openSet = new PriorityQueue()
//     openSet.enqueue(startCell, startCell.weight)
//     while(!openSet.isEmpty()){
//         const current = openSet.dequeue();
//         closed.a
//     }
// }


// const AStarAlgo = (startNode, goalNode, grid, selectedHeuristic) => {
//     let pQueue = new PriorityQueue()
//     let cameFrom = { [serializeArray(startNode)]: null }
//     let costSoFar = { [serializeArray(startNode)]: 0 }
//     let searchedCells = []
//     const [row, col] = startNode
//     const startCell = grid[row][col]
//     pQueue.enqueue(startCell, startCell.weight)
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
//                 const heuristic_cost = calcHeuristicDistance(selectedHeuristic, neighbor.coords, goalNode)
//                 const total_cost = pathCost + heuristic_cost
//                 costSoFar[neighborCoords] = pathCost
//                 pQueue.enqueue(neighbor, total_cost)
//                 cameFrom[neighborCoords] = current
//             }
//         });
//     }
//     return [cameFrom, searchedCells]
// }