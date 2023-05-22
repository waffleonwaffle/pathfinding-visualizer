import PriorityQueue from "./PriorityQueue"
const serializeArray = (arr) => {
    return JSON.stringify(arr);
}
const DijkstraAlgo = (startNode, grid) => {
    let pQueue = new PriorityQueue()
    let cameFrom = {[serializeArray(startNode)]: null }
    let costSoFar = {[serializeArray(startNode)]: 0 }
    const [row, col] = startNode
    const startCell = grid[row][col]
    pQueue.enqueue(startCell, startCell.weight)
    while (!pQueue.isEmpty()) {
        const current = pQueue.dequeue();
        if (current.isGoal) {
            return cameFrom
        }
        current.neighbors.forEach(neighbor => {
            // console.log(neighbor.coords, neighbor.weight)
            const neighboorCoords = serializeArray(neighbor.coords)
            const newCost = neighbor.weight + costSoFar[serializeArray(current.coords)]
            if (neighbor.weight !== Infinity && (!(neighboorCoords in costSoFar) || newCost < costSoFar[neighboorCoords])) {
                pQueue.enqueue(neighbor, newCost)
                cameFrom[neighboorCoords] = current
                costSoFar[neighboorCoords] = newCost
            }

        });
    }
    return null
}
export default DijkstraAlgo




