const Cell = ({ cell, handleClick }) => {
    return (
        <td className={cellType(cell)} onClick={() => handleClick(cell.coords)}></td>
    )
}


const cellType = (cell) => {
    if(cell.isStart || cell.isGoal) {
        return "start-cell"
    } else if(cell.clicked) {
        return "clicked-cell"
    } else if(cell.partOfPath) {
        return "path-cell"
    }
    return "grid-cell"
}
export default Cell