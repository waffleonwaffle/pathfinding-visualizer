import { Menu, Button } from '@mantine/core';

const GridTypesHub = () => {
    const handlePatternChange = (event) => {
        const selectedAlgorithm = event.target.innerText;
        // onAlgorithmChange(selectedAlgorithm.trim())
    }
    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button>Grid Types</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={handlePatternChange}>Random Grid</Menu.Item>
                <Menu.Item onClick={handlePatternChange}>Random Weighted Grid</Menu.Item>
                <Menu.Item onClick={handlePatternChange}>Hexagonal Grid</Menu.Item>

            </Menu.Dropdown>
        </Menu>
    )
}
export default GridTypesHub