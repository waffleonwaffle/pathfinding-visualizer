import { Menu, Button } from '@mantine/core';

const GridTypesHub = ({onGridTypeChange}) => {
    const handleGridTypeChange = (event) => {
        const selectedGridType = event.target.innerText;
        onGridTypeChange(selectedGridType)
    }
    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button className="config-hub-elements">Grid Types</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={handleGridTypeChange}>Random Grid</Menu.Item>
                <Menu.Item onClick={handleGridTypeChange}>Random Weighted Grid</Menu.Item>
                <Menu.Item onClick={handleGridTypeChange}>Hexagonal Grid</Menu.Item>

            </Menu.Dropdown>
        </Menu>
    )
}
export default GridTypesHub