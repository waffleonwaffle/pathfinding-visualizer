import Grid from "./Grid";
import AlgorithmConfigHub from "./HeaderComponents/AlgorithmConfigHub";
import SettingsHub from "./HeaderComponents/SettingsHub";
import WeightPickerHub from "./HeaderComponents/WeightPickerHub";
import GridTypesHub from "./HeaderComponents/GridTypesHub";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import {
  setClearedGrid,
  setClearedObstacles,
  setClearedPath,
} from "../reducers/pathfindingReducer";
const PathfindingVisualizer = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="config-hub">
        <header>Pathfinding Visualizer</header>
        <AlgorithmConfigHub></AlgorithmConfigHub>
        <GridTypesHub></GridTypesHub>
        <Button
          className="config-hub-elements"
          onClick={() => dispatch(setClearedGrid(true))}
        >
          Clear Board
        </Button>
        <Button
          className="config-hub-elements"
          onClick={() => dispatch(setClearedObstacles(true))}
        >
          Clear Obstacles
        </Button>
        <Button
          className="config-hub-elements"
          onClick={() => dispatch(setClearedPath(true))}
        >
          Clear Path
        </Button>
        <WeightPickerHub className="config-hub-elements">
          Weight Picker
        </WeightPickerHub>
        <SettingsHub></SettingsHub>
      </div>
      <Grid></Grid>
    </div>
  );
};

export default PathfindingVisualizer;
