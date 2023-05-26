const Cell = ({ cell, handleMoveWaypoints, handleClick }) => {
    const cellType = (cell) => {
        let className = ""
        if (cell.isStart || cell.isGoal) {
            className += "start-cell"
        } else if (cell.wall) {
            className += "wall-cell"
        } else if (cell.partOfPath) {
            className += "path-cell"
        } else {
            className += "grid-cell"
        }
        return className
    }


    return (
        <td className={cellType(cell)}
            onMouseMove={(cell.isStart || cell.isGoal) ? handleMoveWaypoints : null}
            onClick={() => handleClick(cell.coords)}>
        </td>
    )
}


export default Cell