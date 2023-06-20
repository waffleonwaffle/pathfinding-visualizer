import { serializeArray, findNeighbor } from "../components/helpers/gridHelperFunctions"
const DFSAlgo = (grid, startNode, goalNode=null, heuristicInfo=null ) => {
    let stack = []
    let cameFrom = { [serializeArray(startNode)]: null }
    let searchedCells = []
    const [row, col] = startNode
    const startCell = grid[row][col]
    stack.push(startCell)
    while (stack.length !== 0) {
        const current = stack.pop()
        searchedCells.push(current.coords)
        if (current.isGoal) {
            let path = [];
            let currentNode = current;

            while (currentNode !== null) {
                path.unshift(currentNode.coords);
                currentNode = cameFrom[serializeArray(currentNode.coords)];
            }

            return [cameFrom, searchedCells, path];
        }
        current.neighbors.forEach(neighborId => {
            const [curRow, curCol] = current.coords
            const neighbor = findNeighbor(curRow, curCol, neighborId, grid)
            const neighborCoords = serializeArray(neighbor.coords)
            if (neighbor.weight !== Infinity && !(neighborCoords in cameFrom)) {
                cameFrom[neighborCoords] = current
                stack.push(neighbor)
            }


        });
    }
    return [cameFrom, searchedCells, []]
}
export default DFSAlgo


