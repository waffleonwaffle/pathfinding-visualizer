const INITIAL_HEAURISTIC = "Manhattan"
const INITIAL_CELLTYPE = "Wall"
const INITIAL_SPEEDTYPE = "Fast"
const INITIAL_HEAURISTIC_WEIGHT = 1.001
const START_CELL_COORDS = [1, 1];
const GOAL_CELL_COORDS = [15, 35];
export const initialState = {
    grid: [],
    selectedAlgorithm: '',
    selectedGridType: '',
    selectedHeuristic: INITIAL_HEAURISTIC,
    selectedCellType: INITIAL_CELLTYPE,
    selectedSpeedType: INITIAL_SPEEDTYPE,
    diagonalMovement: false,
    selectedHeuristicWeight: INITIAL_HEAURISTIC_WEIGHT,
    clearedGrid: false,
    clearedPath: false,
    clearObstacles: false,
    startCell: START_CELL_COORDS,
    goalCell: GOAL_CELL_COORDS
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CLEARED_GRID':
            return { ...state, clearedGrid: action.payload };
        case 'SET_CLEARED_OBSTACLES':
            return { ...state, clearObstacles: action.payload };
        case 'SET_ALGORITHM':
            return { ...state, selectedAlgorithm: action.payload };
        case 'SET_GRIDTYPE':
            return { ...state, selectedGridType: action.payload };
        case 'SET_CELLTYPE':
            return { ...state, selectedCellType: action.payload };
        case 'SET_HEURISTIC_WEIGHT':
            return { ...state, selectedHeuristicWeight: action.payload };
        case 'SET_HEURISTIC':
            return { ...state, selectedHeuristic: action.payload };
        case 'SET_ANIMATION_SPEED':
            return { ...state, selectedSpeedType: action.payload };
        case 'SET_DIAGONAL_MOVEMENT':
            return { ...state, selectedSpeedType: action.payload };
        default:
            return state;
    }
};
