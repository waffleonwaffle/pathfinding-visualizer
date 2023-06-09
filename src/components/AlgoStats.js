const AlgoStats = ({
  algorithm,
  totalVisitedCells,
  totalExecutionTime,
  totalPathCost,
}) => {
  if (
    !algorithm ||
    !totalVisitedCells ||
    !totalExecutionTime ||
    !totalPathCost
  ) {
    return null;
  }
  return (
    <section className="algorithm-stats">
      <div>
        <span style={{ fontWeight: "bold" }}>Algorithm:</span> {algorithm}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Total Visited Cells:</span>{" "}
        {totalVisitedCells}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Shortest Path Cost:</span>{" "}
        {totalPathCost}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Total Execution Time:</span>{" "}
        {totalExecutionTime} ms
      </div>
    </section>
  );
};

export default AlgoStats;
