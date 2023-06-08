

import { createSlice } from "@reduxjs/toolkit";
const INITIAL_HEURISTIC = "Manhattan"
const INITIAL_SPEEDTYPE = "Fast"
const INITIAL_HEURISTIC_WEIGHT = 1.001
const settingsSlice = createSlice({
    name: 'pathfinding',
    initialState: {
        selectedHeuristic: INITIAL_HEURISTIC,
        selectedSpeedType: INITIAL_SPEEDTYPE,
        diagonalMovement: false,
        selectedHeuristicWeight: INITIAL_HEURISTIC_WEIGHT,
    },
    reducers: {
        setSpeedType: (state, action) => {
            state.selectedSpeedType = action.payload
        }, 
        setHeuristicWeight: (state, action) => {
            state.selectedHeuristicWeight = action.payload
        },
        setHeuristic: (state, action) => {
            state.selectedHeuristic = action.payload
        }, 
        setMovementType: (state, action) => {
            state.diagonalMovement = action.payload
        }

    },
});

export const {setSpeedType, setHeuristicWeight, setHeuristic, setMovementType } = settingsSlice.actions
export default settingsSlice.reducer