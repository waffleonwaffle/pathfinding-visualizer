import { Button } from "@mantine/core"
import { useDispatch} from "react-redux";
import { updateNeighbors } from "./helpers/gridHelperFunctions";
import { setHeuristic, setHeuristicWeight, setSpeedType, setMovementType } from '../reducers/settingsReducer'
import { setGoalCell, setStartCell } from "../reducers/gridReducer";
import { setAlgorithm } from '../reducers/pathfindingReducer'
import { useState } from "react";
const CopyPaste = ({ grid, setGrid, selectedAlgorithm, selectedHeuristic, selectedHeuristicWeight, selectedSpeedType, diagonalMovement, clearPath }) => {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")

    const showErrorMessage = (message) => {
        setErrorMessage(message)
        setTimeout(()=>{
            setErrorMessage("")
        }, 2000)
    }
    const handleCopyGrid = async () => {
        const pathOnGrid = grid.find((row) => row.find(cell => (cell.searched || cell.partOfPath)))
        if(pathOnGrid) {
            showErrorMessage("Clear the path first")
        }
        let inputtedGrid = grid.map(row => row.map(cell => JSON.stringify(cell)).join('\t')).join('\n');
        const formattedBoardSettings = selectedAlgorithm + "}" +
            selectedHeuristic + "}" +
            diagonalMovement + "}" +
            selectedHeuristicWeight + "}" +
            selectedSpeedType + "}" +
            inputtedGrid
        await navigator.clipboard.writeText(formattedBoardSettings)
    }

    const handlePasteGrid = async () => {
        const text = await navigator.clipboard.readText()
        try {
            const objectStrings = text.split('}');
            const validObjectStrings = objectStrings.slice(5).filter(Boolean).map(objectString => objectString.trim() + '}');
            const objects = validObjectStrings.map(objectString => JSON.parse(objectString));
            const formattedArray = [];
            let row = []
            for (let i = 0; i < 1000; i++) {
                const cell = objects[i]
                cell.weight = cell.weight === null ? Infinity : cell.weight
                row.push(objects[i])
                if (cell.isStart) {
                    dispatch(setStartCell(cell.coords))
                } else if (cell.isGoal) {
                    dispatch(setGoalCell(cell.coords))
                }
                if ((i + 1) % 50 === 0) {
                    formattedArray.push(row)
                    row = []
                }
            }
            updateNeighbors(formattedArray, diagonalMovement)
            await setGrid([...formattedArray])
            dispatch(setAlgorithm(objectStrings[0]))
            dispatch(setHeuristic(objectStrings[1]))
            dispatch(setMovementType(objectStrings[2] === "true"))
            dispatch(setHeuristicWeight(parseFloat(objectStrings[3])))
            dispatch(setSpeedType(objectStrings[4]))
        } catch (error) {
            showErrorMessage("Please double-check your copied content.")


        }
    }
    return (
        <section className='grid-clipboard'>
            <Button className='clipboard-button' onClick={handleCopyGrid}>Copy Grid</Button>
            <div className="error-message">{errorMessage}</div>
            <Button className='clipboard-button' onClick={handlePasteGrid}>Paste Grid</Button>
        </section>
    )
}

export default CopyPaste
