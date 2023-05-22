// import { createSlice } from "@reduxjs/toolkit"
// import Cell from '../components/Cell'
 
// const initializeGrid = () => {
//     const grid = []
//     for(let r = 0; r < 20; r++){
//         const row = []
//         for(let c = 0; c < 50; c++){
//             const cellId = `cell-${r}-${c}`;
//             row.push(<Cell key={cellId} id={{r, c}}clicked={false} isStart={false} isGoal={false} />)
//         }
//         grid.push(<tr key={r}>{row}</tr>)
//     }
//     console.log(grid)
//     return grid
// }

// const gridReducer = createSlice({
//     name: 'grid', 
//     initialState: initializeGrid(),
//     reducers: {
//         cellClicked: (state, action) => {
//             // console.log(action.payload)
//             const id = action.payload
//             console.log(state)
//             const clickedCell = state.find(cell => cell.id === id)
//             return state.map(cell => cell.id === clickedCell.id ? {...cell, clicked: !cell.clicked} : cell)


//         }
//     }
// })

// export const {cellClicked} = gridReducer.actions
// export default gridReducer.reducer