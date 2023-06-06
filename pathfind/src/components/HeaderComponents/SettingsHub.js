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
                    <IconSettings className='settings-icon'></IconSettings>
                </Button>

            </Menu.Target>

            <Menu.Dropdown className="settings">
                <section className="heuristic-picker">
                    <span style={{ fontWeight: 'bold' }}>Heuristic:</span>
                    <Radio.Group defaultValue={selectedHeuristic}>
                        <Radio className='heuristic-button' onClick={handleHeuristicChange} value="Manhattan" label="Manhattan" />
                        <Radio className='heuristic-button' onClick={handleHeuristicChange} value="Euclidean" label="Euclidean" />
                        <Radio className='heuristic-button' onClick={handleHeuristicChange} value="Chebyshev" label="Chebyshev" />
                    </Radio.Group>
                </section>
                <section className="movement-picker">
                    <Checkbox checked={diagonalMovement} onChange={onMovementChange} label="8-Directional Movement" />
                </section>

                <section className="speed-picker">
                    <span style={{ fontWeight: 'bold' }}>Animation Speed (s):</span>
                    <Radio.Group defaultValue={selectedSpeedType}>
                        <Radio className='speed-button' onClick={handleSpeedChange} value="Fast" label="Fast" />
                        <Radio className='speed-button' onClick={handleSpeedChange} value="Medium" label="Medium" />
                        <Radio className='speed-button' onClick={handleSpeedChange} value="Slow" label="Slow" />
                    </Radio.Group>
                </section>
            </Menu.Dropdown>
        </Menu>

    )
}
export default SettingsHub