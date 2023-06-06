const AlgoStats = ({ algorithm, totalVisitedCells, totalExecutionTime }) => {
    if (!algorithm || !totalVisitedCells || !totalExecutionTime) {
        return null
    }
    return (
        <section className="algorithm-stats">
            <div>
                <span style={{ fontWeight: 'bold' }}>Algorithm:</span> {algorithm}
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Total Visited Cells:</span> {totalVisitedCells}
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Total Execution Time:</span>  {totalExecutionTime} ms
            </div>
            
        </section>
    )
}

export default AlgoStats