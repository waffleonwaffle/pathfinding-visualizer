import AlgorithmConfigHub from "./AlgorithmConfigHub"
import GridTypesHub from "./GridTypesHub";
import { Button } from '@mantine/core';

const Header = ({handleAlgorithmChange, handleGridTypeChange, handleClearObstacles, handleClearGrid}) => {

    return (
        <div className="header">
            <AlgorithmConfigHub onAlgorithmChange={handleAlgorithmChange}></AlgorithmConfigHub>
            <GridTypesHub onGridTypeChange={handleGridTypeChange}></GridTypesHub> 
            <Button onClick={handleClearGrid}>Clear Board</Button> 
            <Button onClick={handleClearObstacles}>Clear Obstacles</Button> 
        </div>
    )
}

export default Header