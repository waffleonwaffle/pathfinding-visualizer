import { Menu, Button } from '@mantine/core';

const AlgorithmConfigHub = ({onAlgorithmChange}) => {
    const handleItemClick = (event) => {
        const selectedAlgorithm = event.target.innerText;
        onAlgorithmChange(selectedAlgorithm)
    }
    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button>Algorithms</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={handleItemClick}>Depth-first Search</Menu.Item>
                <Menu.Item onClick={handleItemClick}>Breadth-first Search</Menu.Item>
                <Menu.Item onClick={handleItemClick}>Dijkstra's Algorithm</Menu.Item>
                <Menu.Item onClick={handleItemClick}>A* Search</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
export default AlgorithmConfigHub