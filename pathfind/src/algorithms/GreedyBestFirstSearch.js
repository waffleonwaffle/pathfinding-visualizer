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
const GreedyBestFirstAlgo = (startNode, goalNode, grid) => {
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
            return [true, cameFrom, searchedCells]
        }
        current.neighbors.forEach(neighbor => {
            const neighborCoords = serializeArray(neighbor.coords)
            const pathCost = ManhattanDistanceHeuristic(neighbor.coords, goalNode)
            if (neighbor.weight !== Infinity && (!(neighborCoords in costSoFar) || pathCost < costSoFar[neighborCoords])) {
                costSoFar[neighborCoords] = pathCost
                pQueue.enqueue(neighbor, pathCost)
                cameFrom[neighborCoords] = current
            }
        });
    }
    return [false, cameFrom, searchedCells]
}
export default GreedyBestFirstAlgo




                