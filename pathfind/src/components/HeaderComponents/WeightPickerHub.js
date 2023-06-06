import { Menu, Button } from '@mantine/core';

const WeightPickerHub = ({ onCellTypeChange }) => {
    const handleChangeCellType = (event) => {
        const { selectedCellType } = event.currentTarget.dataset;
        onCellTypeChange(selectedCellType);
    };

    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button className="config-hub-elements">Configure Cell Types</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={handleChangeCellType} data-selected-cell-type="Sand" style={{ color: '#D2B48C', fontWeight: 'bold' }}>
                    Sand-5
                </Menu.Item>
                <Menu.Item onClick={handleChangeCellType} data-selected-cell-type="Water" style={{ color: '#000080', fontWeight: 'bold' }}>
                    Water-10
                </Menu.Item>
                <Menu.Item onClick={handleChangeCellType} data-selected-cell-type="Forest" style={{ color: '#006400', fontWeight: 'bold' }}>
                    Forest-50
                </Menu.Item>
                <Menu.Item onClick={handleChangeCellType} data-selected-cell-type="Wall" style={{ color: '#343A40', fontWeight: 'bold' }}>
                    Wall-∞
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default WeightPickerHub;
