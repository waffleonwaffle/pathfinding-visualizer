import PriorityQueue from "../components/helpers/PriorityQueue";
import {
  findNeighbor,
  serializeArray,
} from "../components/helpers/gridHelperFunctions";
const DijkstraAlgo = (grid, startNode, goalNode = null) => {
  let pQueue = new PriorityQueue();
  let cameFrom = { [serializeArray(startNode)]: null };
  let costSoFar = { [serializeArray(startNode)]: 0 };
  let searchedCells = [];
  const [row, col] = startNode;
  const startCell = grid[row][col];
  pQueue.enqueue(startCell, startCell.weight);
  while (!pQueue.isEmpty()) {
    const current = pQueue.dequeue();
    searchedCells.push(current.coords);
    if (current.isGoal) {
      return [cameFrom, searchedCells];
    }
    current.neighbors.forEach((neighborId) => {
      const [curRow, curCol] = current.coords;
      const neighbor = findNeighbor(curRow, curCol, neighborId, grid);
      const neighboorCoords = serializeArray(neighbor.coords);
      const newCost =
        neighbor.weight + costSoFar[serializeArray(current.coords)];
      if (
        neighbor.weight !== Infinity &&
        (!(neighboorCoords in costSoFar) ||
          newCost < costSoFar[neighboorCoords])
      ) {
        costSoFar[neighboorCoords] = newCost;
        pQueue.enqueue(neighbor, newCost);
        cameFrom[neighboorCoords] = current;
      }
    });
  }
  return [cameFrom, searchedCells];
};

export default DijkstraAlgo;
