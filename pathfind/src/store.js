import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./reducers/gridReducer";
import pathfindingReducer from "./reducers/pathfindingReducer";
import settingsReducer from "./reducers/settingsReducer";
const store = configureStore({
  reducer: {
    grid: gridReducer,
    pathfind: pathfindingReducer,
    settings: settingsReducer,
  },
});

export default store;
