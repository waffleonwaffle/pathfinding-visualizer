import { Menu, Button, Radio, Checkbox, Slider } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { setHeuristic, setSpeedType, setHeuristicWeight, setMovementType } from '../../reducers/settingsReducer';
import HeuristicOption from './HeuristicOption';
const SettingsHub = () => {
    const dispatch = useDispatch()
    const selectedHeuristic = useSelector((state) => state.settings.selectedHeuristic)
    const selectedSpeedType = useSelector((state) => state.settings.selectedSpeedType)
    const selectedHeuristicWeight = useSelector((state) => state.settings.selectedHeuristicWeight)
    const diagonalMovement = useSelector((state) => state.settings.diagonalMovement)
    const handleHeuristicChange = (event) => {
        const heuristic = event.target.getAttribute('value');
        dispatch(setHeuristic(heuristic));
    };

    const setAnimationSpeed = (event) => {
        const speed = event.target.getAttribute('value');
        dispatch(setSpeedType(speed));

    };

    const toggleDiagonalMovement = () => {
        dispatch(setMovementType(!diagonalMovement));
    };
    return (
        <Menu shadow="lg" width={200}>
            <Menu.Target>
                <Button className="config-hub-elements">
                    <IconSettings className='settings-icon'></IconSettings>
                </Button>

            </Menu.Target>
            <Menu.Dropdown className="settings">
                <section className="heuristic-grid">
                    <span style={{ fontWeight: 'bold' }}>Heuristic: </span>
                    <Radio.Group defaultValue={selectedHeuristic}>
                        <HeuristicOption heuristicLink={"https://xlinux.nist.gov/dads/HTML/manhattanDistance.html"} handleHeuristicChange={handleHeuristicChange} heuristicName={"Manhattan"}></HeuristicOption>
                        <HeuristicOption heuristicLink={"https://xlinux.nist.gov/dads/HTML/euclidndstnc.html"} handleHeuristicChange={handleHeuristicChange} heuristicName={"Euclidean"}></HeuristicOption>
                        <HeuristicOption heuristicLink={"https://en.wikipedia.org/wiki/Chebyshev_distance"} handleHeuristicChange={handleHeuristicChange} heuristicName={"Chebyshev"}></HeuristicOption>
                        <HeuristicOption heuristicLink={"http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#diagonal-distance"} handleHeuristicChange={handleHeuristicChange} heuristicName={"Octile"}></HeuristicOption>
                    </Radio.Group>
                </section>
                <section className='heuristic-weight-grid'>
                    <span style={{ fontWeight: 'bold' }}>Heuristic Weight:</span>
                    <Slider color="dark" className='weight-slider' defaultValue={selectedHeuristicWeight} onChange={(heuristicWeight) => dispatch(setHeuristicWeight(heuristicWeight))} min={0} max={10} step={0.001} value={selectedHeuristicWeight.toFixed(3)} ></Slider>
                </section>
                <section className="movement-grid">
                    <Checkbox color="dark" checked={diagonalMovement} onChange={toggleDiagonalMovement} label="8-Directional Movement" />
                </section>

                <section className="speed-grid">
                    <span style={{ fontWeight: 'bold' }}>Animation Speed (s):</span>
                    <Radio.Group defaultValue={selectedSpeedType}>
                        <Radio color="dark" className='speed-button' onClick={setAnimationSpeed} value="Fast" label="Fast" />
                        <Radio color="dark" className='speed-button' onClick={setAnimationSpeed} value="Medium" label="Medium" />
                        <Radio color="dark" className='speed-button' onClick={setAnimationSpeed} value="Slow" label="Slow" />
                    </Radio.Group>
                </section>
            </Menu.Dropdown>
        </Menu>

    )
}
export default SettingsHub