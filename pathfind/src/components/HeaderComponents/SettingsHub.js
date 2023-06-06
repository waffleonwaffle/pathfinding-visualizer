import { Menu, Button, Radio, Checkbox } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

const SettingsHub = ({ onHeuristicChange, onMovementChange, onSpeedChange, selectedHeuristic, diagonalMovement, selectedSpeedType }) => {
    const handleHeuristicChange = (event) => {
        const selectedHeuristic = event.target.getAttribute('value');
        onHeuristicChange(selectedHeuristic)
    }

    const handleSpeedChange = (event) => {
        const selectedSpeed = event.target.getAttribute('value');
        onSpeedChange(selectedSpeed)
    }
    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button className="config-hub-elements">
                    <IconSettings></IconSettings>
                </Button>

            </Menu.Target>

            <Menu.Dropdown className="settings">
                <section className="heuristic-picker">
                    <span style={{ fontWeight: 'bold' }}>Heuristic:</span>
                    <Radio.Group className='mantine-radio-group' defaultValue={selectedHeuristic}>
                        <Radio onClick={handleHeuristicChange} value="Manhattan" label="Manhattan" />
                        <Radio onClick={handleHeuristicChange} value="Euclidean" label="Euclidean" />
                        <Radio onClick={handleHeuristicChange} value="Chebyshev" label="Chebyshev" />
                    </Radio.Group>
                </section>
                <section className="movement-picker">
                    <Checkbox className='mantine-checkbox' checked={diagonalMovement} onChange={onMovementChange} label="8-Directional Movement" />
                </section>

                <section className="speed-picker">
                    <span style={{ fontWeight: 'bold' }}>Animation Speed (s):</span>
                    <Radio.Group className='mantine-radio-group' defaultValue={selectedSpeedType}>
                        <Radio onClick={handleSpeedChange} value="Fast" label="Fast" />
                        <Radio onClick={handleSpeedChange} value="Medium" label="Medium" />
                        <Radio onClick={handleSpeedChange} value="Slow" label="Slow" />
                    </Radio.Group>
                </section>
            </Menu.Dropdown>
        </Menu>

    )
}
export default SettingsHub