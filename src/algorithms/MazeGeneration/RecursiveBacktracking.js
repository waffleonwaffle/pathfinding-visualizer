// import {DOWN, UP, LEFT, RIGHT} from '../../components/helpers/gridHelperFunctions'
// let visited = new Set()
// const RecursiveBacktrackingAlgo = (grid, r, c) => {
//     const randomCompare = () => Math.random() - 0.5;
//     const directions = [DOWN, UP, LEFT, RIGHT].sort(randomCompare);
//     const directionIndex = Math.floor(Math.random() * 4)
//     if (
//                 r >= 0 &&
//                 c >= 0 &&
//                 r < grid.length &&
//                 c < grid[0].length &&
//                 !visited.has(cellKey)
//             )
//     directions.forEach((direction, index) => {
//         if(index !== directionIndex) {
//             visited.add(direction.toString())
//         }
//     })

//     const [dr, dc] = directions[directionIndex]
//     const row = dr + r
//     const col = dc + c
//     grid[row][col] = { ...grid[row][col], weightType: "Wall", weight: Infinity};
//     RecursiveBacktrackingAlgo(grid, row, col)
//     // directions.forEach((direction) => {
//     //     const [dr, dc] = direction;
//     //     const row = r + dr;
//     //     const col = c + dc;
//     //     const cellKey = [row, col].toString();

//     //     if (
//     //         row >= 0 &&
//     //         col >= 0 &&
//     //         row < grid.length &&
//     //         col < grid[0].length &&
//     //         !visited.has(cellKey)
//     //     ) {
//     //         grid[row][col] = { ...grid[row][col], weightType: "Wall", weight: Infinity };

//     //         RecursiveBacktrackingAlgo(grid, row, col);
//     //     }
//     // });
// };

// export default RecursiveBacktrackingAlgo;
