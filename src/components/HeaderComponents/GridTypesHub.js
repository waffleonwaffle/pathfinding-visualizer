import { Menu, Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setGridType } from "../../reducers/pathfindingReducer";
const GridTypesHub = () => {
  const dispatch = useDispatch();
  const handleGridTypeChange = (event) => {
    const gridType = event.target.innerText;
    dispatch(setGridType(gridType));
  };
  return (
    <Menu shadow="lg" width={200}>
      <Menu.Target>
        <Button className="config-hub-elements">Grid Types</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={handleGridTypeChange}>Random Grid</Menu.Item>
        <Menu.Item onClick={handleGridTypeChange}>
          Random Weighted Grid
        </Menu.Item>
        <Menu.Item onClick={handleGridTypeChange}>Hexagonal Grid</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default GridTypesHub;
