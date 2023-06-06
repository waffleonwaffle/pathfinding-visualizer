const Cell = ({ cell }) => {
    const cellType = (cell) => {
        let className = ""
        if (cell.clickedAnimation) {
            className = "animate-weight-cell"
        } else if (cell.pathAnimation) {
            className = "animate-path-cell"
        } else if (cell.isStart || cell.isGoal) {
            className = "waypoints"
        } else if (cell.partOfPath) {
            className = "path-cell"
        } else if (cell.searched) {
            className = "searched-cell"        
        } 
        else if (cell.weight !== "Unweighted") {
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
                case "Forest":
                    className = "forest-cell"
                    break;
                default:
                    break
            }
        } 
        else {
            className = "grid-cell"
        }
        return className
    }


    return (

        <td className={cellType(cell)}>{cell.weightType !== "Unweighted" && cell.weightType !== "Wall" ? cell.weight : ""}</td>
    )
}


export default Cell