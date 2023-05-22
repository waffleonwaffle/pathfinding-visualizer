import { Menu, Button } from '@mantine/core';
let selectedAlgorithm = ""

const AlgorithmConfigHub = () => {
    const handleItemClick = (event) => {
        selectedAlgorithm = event.target.innerText;
    }
    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button>Algorithms</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={handleItemClick}>Dijkstra's Algorithm</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
export {selectedAlgorithm}
export default AlgorithmConfigHub