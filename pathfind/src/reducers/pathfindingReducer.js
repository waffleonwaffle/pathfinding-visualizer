import { createSlice } from "@reduxjs/toolkit";
const INITIAL_CELLTYPE = "Wall"
const pathfindingSlice = createSlice({
    name: 'pathfinding',
    initialState: {
        selectedAlgorithm: '',
        selectedGridType: '',
        selectedCellType: INITIAL_CELLTYPE,
        clearedGrid: false,
        clearObstacles: false,
        clearPath: false
    },
    reducers: {
        setAlgorithm: (state, action) => {
            state.selectedAlgorithm = action.payload
        }, 
        setGridType: (state, action) => {
            state.selectedGridType = action.payload
        }, 
        setCellType: (state, action) => {
            state.selectedCellType = action.payload
        },  
        setClearedGrid: (state, action) => {
            state.clearedGrid = action.payload
        }, 
        setClearedObstacles: (state, action) => {
            state.clearObstacles = action.payload
        }, 
        setClearedPath: (state, action) => {
            state.clearPath = action.payload
        },

    },
});

export const resetGridType = () => {
    return (dispatch) => {
        dispatch(setGridType(""))
    }
}


export const resetSelectedAlgorithm = () => {
    return (dispatch) => {
        dispatch(setAlgorithm(""))
    }
}

export const resetClearedGrid = () => {
    return (dispatch) => {
        dispatch(setClearedGrid(""))
    }
}


export const resetClearedObstacles = () => {
    return (dispatch) => {
        dispatch(setClearedObstacles(""))
    }
}

export const resetClearedPath = () => {
    return (dispatch) => {
        dispatch(setClearedPath(""))
    }
}

export const {setAlgorithm, setGridType, setCellType, setClearedGrid, setClearedObstacles, setClearedPath} = pathfindingSlice.actions
export default pathfindingSlice.reducer