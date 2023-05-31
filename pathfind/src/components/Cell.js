const Cell = ({ cell }) => {
    const cellType = (cell) => {
        let className = ""
        if (cell.clicked) {
            className = "animate-wall-cell"
        } else if (cell.animate) {
            className = "animate-path-cell"
        } else if (cell.isStart || cell.isGoal) {
            className = "start-cell"
        } else if (cell.partOfPath) {
            className = "path-cell"
        } else if (cell.weightType !== "unweighted") {
            switch (cell.weightType) {
                case "Wall":
                    className = "wall-cell"
                    break;
                case "Sand":
                    className = "sand-cell"
                    break;
                case "Water":
                    className = "water-cell"
                    break;
                case "Mud":
                    className = "mud-cell"
                    break;
                default:
                    className = ""
            }
        } else if (cell.searched) {
            className = "searched-cell"
        } else {
            className = "grid-cell"
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