import PriorityQueue from "../components/helpers/PriorityQueue"
const serializeArray = (arr) => {
    return JSON.stringify(arr);
}
const D = 1.001
const ManhattanDistanceHeuristic = (a, b) => {
    const [x1, y1] = a
    const [x2, y2] = b
    const distance = Math.abs(x2 - x1) + Math.abs(y2 - y1)
    return D * distance
}
const AStarAlgo = (startNode, goalNode, grid) => {
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
        current.neighbors.forEach(neighbor => {
            const neighborCoords = serializeArray(neighbor.coords)
            const pathCost = neighbor.weight + costSoFar[serializeArray(current.coords)]
            if (neighbor.weight !== Infinity && (!(neighborCoords in costSoFar) || pathCost < costSoFar[neighborCoords])) {
                const heuristic_cost = ManhattanDistanceHeuristic(neighbor.coords, goalNode)
                const total_cost = pathCost + heuristic_cost
                // console.log(neighbor.coords, newCost, ManhattanDistanceHeuristic(neighbor.coords, goalNode), heuristic_cost)
                // console.log(neighbor.coords, newCost, ManhattanDistanceHeuristic(neighbor.coords, goalNode) * 1.001, newCost + ManhattanDistanceHeuristic(neighbor.coords, goalNode) * 1.001)
                costSoFar[neighborCoords] = pathCost
                pQueue.enqueue(neighbor, total_cost)
                cameFrom[neighborCoords] = current
            }
        });
    }
    return [cameFrom, searchedCells]
}
export default AStarAlgo




                