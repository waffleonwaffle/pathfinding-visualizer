const Cell = ({ cell, handleClick }) => {
    const cellType = (cell) => {
        let className = ""
        if(cell.clicked) {
            className = "animate-cell"
        } 
        else if (cell.isStart || cell.isGoal) {
            className = "start-cell"
        } else if (cell.wall) {
            className = "wall-cell"
        } else if (cell.partOfPath) {
            className = "path-cell"
        } else if (cell.searched) {
            className = "searched-cell"
        } 
        return className
    }


    return (
        <td
            className={cellType(cell)}
        ></td>
    )
}


export default Cell