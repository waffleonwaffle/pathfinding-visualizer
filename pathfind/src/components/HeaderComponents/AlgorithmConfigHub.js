import { Menu, Button } from '@mantine/core';
import { Select } from '@mantine/core';
const AlgorithmConfigHub = ({onAlgorithmChange}) => {
    const handleItemClick = (event) => {
        const selectedAlgorithm = event.target.innerText;
        onAlgorithmChange(selectedAlgorithm.trim())
    }
    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button className="config-hub-elements">Algorithms</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={handleItemClick}>Depth-first Search</Menu.Item>
                <Menu.Item onClick={handleItemClick}>Breadth-first Search</Menu.Item>
                <Menu.Item onClick={handleItemClick}>Dijkstra's Algorithm</Menu.Item>
                <Menu.Item onClick={handleItemClick}>A* Search</Menu.Item>
                <Menu.Item onClick={handleItemClick}>Greedy best-first Search</Menu.Item>

            </Menu.Dropdown>
        </Menu>
    )
}
export default AlgorithmConfigHub