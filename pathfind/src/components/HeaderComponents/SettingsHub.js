import { Menu, Button, Radio, Checkbox, Slider } from '@mantine/core';
import { useClipboard } from '@mantine/hooks'
import { IconSettings } from '@tabler/icons-react';
import HeuristicOption from './HeuristicOption';
const SettingsHub = ({
    onHeuristicChange,
    onMovementChange,
    onSpeedChange,
    onHeuristicWeightChange,
    selectedHeuristic,
    diagonalMovement,
    selectedSpeedType,
    selectedHeuristicWeight,
    onCopyGrid,
    onPasteGrid
}) => {
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
                    <span style={{ fontWeight: 'bold' }}>Heuristic: </span>
                    <Radio.Group defaultValue={selectedHeuristic}>
                        <HeuristicOption heuristicLink={"https://xlinux.nist.gov/dads/HTML/manhattanDistance.html"} handleHeuristicChange={handleHeuristicChange} heuristicName={"Manhattan"}></HeuristicOption>
                        <HeuristicOption heuristicLink={"https://xlinux.nist.gov/dads/HTML/euclidndstnc.html"} handleHeuristicChange={handleHeuristicChange} heuristicName={"Euclidean"}></HeuristicOption>
                        <HeuristicOption heuristicLink={"https://en.wikipedia.org/wiki/Chebyshev_distance"} handleHeuristicChange={handleHeuristicChange} heuristicName={"Chebyshev"}></HeuristicOption>
                        <HeuristicOption heuristicLink={"http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#diagonal-distance"} handleHeuristicChange={handleHeuristicChange} heuristicName={"Octile"}></HeuristicOption>
                    </Radio.Group>

                </section>
                <section>
                    <span style={{ fontWeight: 'bold' }}>Heuristic Weight:</span>
                    <Slider color="cyan" className='weight-slider' defaultValue={selectedHeuristicWeight} onChange={onHeuristicWeightChange} min={0} max={10} step={0.001} value={selectedHeuristicWeight.toFixed(3)} ></Slider>
                </section>
                <section className="movement-picker">
                    <Checkbox checked={diagonalMovement} onChange={onMovementChange} label="8-Directional Movement" />
                </section>

                <section className="speed-picker">
                    <span style={{ fontWeight: 'bold' }}>Animation Speed (s):</span>
                    <Radio.Group defaultValue={selectedSpeedType}>
                        <Radio color="cyan" className='speed-button' onClick={handleSpeedChange} value="Fast" label="Fast" />
                        <Radio color="cyan" className='speed-button' onClick={handleSpeedChange} value="Medium" label="Medium" />
                        <Radio color="cyan" className='speed-button' onClick={handleSpeedChange} value="Slow" label="Slow" />
                    </Radio.Group>
                </section>
                <section>
                    <Button onClick={onCopyGrid}>Copy</Button>
                    <Button onClick={onPasteGrid}>Paste</Button>
                </section>
            </Menu.Dropdown>
        </Menu>

    )
}
export default SettingsHub