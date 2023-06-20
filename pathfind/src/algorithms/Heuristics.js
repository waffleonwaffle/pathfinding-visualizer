/* eslint-disable import/no-anonymous-default-export */
const OctileDistanceHeuristic = (a, b, D) => {
    const [x1, y1] = a
    const [x2, y2] = b
    const dx = Math.abs(x2 - x1)
    const dy = Math.abs(y2 - y1)
    const distance = D * Math.max(dx, dy) + (Math.sqrt(2) - 2 * D) * Math.min(dx, dy)
    return distance
}

const ChebyshevDistanceHeuristic = (a, b, D) => {
    const [x1, y1] = a
    const [x2, y2] = b
    const dx = Math.abs(x2 - x1)
    const dy = Math.abs(y2 - y1)
    return D * (dx + dy) + (-1 * D) * Math.min(dx, dy)
}

const EuclideanDistanceHeuristic = (a, b, D) => {
    const [x1, y1] = a
    const [x2, y2] = b
    const dx = Math.abs(x2 - x1)
    const dy = Math.abs(y2 - y1)
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    return D * distance
}


const ManhattanDistanceHeuristic = (a, b, D) => {
    const [x1, y1] = a
    const [x2, y2] = b
    const dx = Math.abs(x2 - x1)
    const dy = Math.abs(y2 - y1)
    const distance = dx + dy
    return D * distance
}

export const calcHeuristicDistance = (heuristic, heuristicWeight, a, b) => {
    switch (heuristic) {
        case "Manhattan":
            return heuristicWeight * ManhattanDistanceHeuristic(a, b, heuristicWeight)
        case "Euclidean":
            return heuristicWeight * EuclideanDistanceHeuristic(a, b, heuristicWeight)
        case "Chebyshev":
            return heuristicWeight * ChebyshevDistanceHeuristic(a, b, heuristicWeight)
        case "Octile":
            return heuristicWeight * OctileDistanceHeuristic(a, b, heuristicWeight)
        default:
            break
    }
}
