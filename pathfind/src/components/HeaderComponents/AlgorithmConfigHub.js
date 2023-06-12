import { Menu, Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setAlgorithm } from "../../reducers/pathfindingReducer";
const AlgorithmConfigHub = () => {
  const dispatch = useDispatch();
  const handleAlgorithmChange = (event) => {
    const algorithm = event.target.innerText;
    dispatch(setAlgorithm(algorithm));
  };
  return (
    <Menu shadow="lg" width={200}>
      <Menu.Target>
        <Button className="config-hub-elements">Algorithms</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={handleAlgorithmChange}>
          Depth-first Search
        </Menu.Item>
        <Menu.Item onClick={handleAlgorithmChange}>
          Breadth-first Search
        </Menu.Item>
        <Menu.Item onClick={handleAlgorithmChange}>
          Dijkstra's Algorithm
        </Menu.Item>
        <Menu.Item onClick={handleAlgorithmChange}>
          Greedy best-first Search
        </Menu.Item>
        <Menu.Item onClick={handleAlgorithmChange}>A* Search</Menu.Item>
        {/* <Menu.Item onClick={handleAlgorithmChange}>IDA*</Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
};
export default AlgorithmConfigHub;
