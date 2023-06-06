import { Menu, Button } from '@mantine/core';
const AlgorithmConfigHub = ({onAlgorithmChange}) => {
    const handleAlgorithmChange = (event) => {
        const selectedAlgorithm = event.target.innerText;
        onAlgorithmChange(selectedAlgorithm.trim())
    }
    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button className="config-hub-elements">Algorithms</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={handleAlgorithmChange}>Depth-first Search</Menu.Item>
                <Menu.Item onClick={handleAlgorithmChange}>Breadth-first Search</Menu.Item>
                <Menu.Item onClick={handleAlgorithmChange}>Dijkstra's Algorithm</Menu.Item>
                <Menu.Item onClick={handleAlgorithmChange}>Greedy best-first Search</Menu.Item>
                <Menu.Item onClick={handleAlgorithmChange}>A* Search</Menu.Item>
                {/* <Menu.Item onClick={handleAlgorithmChange}>IDA*</Menu.Item> */}

            </Menu.Dropdown>
        </Menu>
    )
}
export default AlgorithmConfigHub