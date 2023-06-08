import { createSlice } from '@reduxjs/toolkit';
const START_CELL_COORDS = [1, 1];
const GOAL_CELL_COORDS = [15, 35];
const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        grid: [],
        startCell: START_CELL_COORDS, 
        goalCell: GOAL_CELL_COORDS, 
    },
    reducers: {
        setGrid: (state, action) => {
            state.grid = action.payload;
        },
        setStartCell: (state, action) => {
            state.startCell = action.payload;
        },
        setGoalCell: (state, action) => {
            state.goalCell = action.payload;
        },
    },
});
export const { setGrid, setStartCell, setGoalCell } = gridSlice.actions;

export default gridSlice.reducer