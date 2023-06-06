// import AlgorithmConfigHub from "./AlgorithmConfigHub"
// import GridTypesHub from "./GridTypesHub";
// import WeightPickerHub from "./WeightPickerHub";
// import { Button } from '@mantine/core';
// import SettingsHub from "./SettingsHub";
// const Header = ({
//     handleHeuristicChange,
//     handleAlgorithmChange,
//     handleGridTypeChange,
//     handleCellChange,
//     handleClearObstacles,
//     handleClearGrid,
//     handleDiagonalMovement,
//     selectedHeuristic, 
//     diagonalMovement
// }) => {
//     return (
//         <div className="config-hub">
//             <AlgorithmConfigHub onAlgorithmChange={handleAlgorithmChange}></AlgorithmConfigHub>
//             <GridTypesHub onGridTypeChange={handleGridTypeChange}></GridTypesHub>
//             <Button className="config-hub-elements" onClick={handleClearGrid}>Clear Board</Button>
//             <Button className="config-hub-elements" onClick={handleClearObstacles}>Clear Obstacles</Button>
//             <WeightPickerHub onCellTypeChange={handleCellChange} className="config-hub-elements">Weight Picker</WeightPickerHub>
//             <SettingsHub selectedHeuristic={selectedHeuristic} diagonalMovement={diagonalMovement} onHeuristicChange={handleHeuristicChange} onMovementChange={handleDiagonalMovement}></SettingsHub>
//         </div>
//     )
// }

// export default Header