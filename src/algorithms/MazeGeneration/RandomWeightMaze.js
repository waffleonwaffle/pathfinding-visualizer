const RandomWeightMaze = (grid) => {
  const weightTypes = [
    ["Unweighted", 1],
    ["Sand", 5],
    ["Water", 10],
    ["Forest", 50],
  ];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c].isStart || grid[r][c].isGoal) {
        continue;
      }
      const randomWeight = Math.floor(Math.random() * 4);
      const [wType, wVal] = weightTypes[randomWeight];
      grid[r][c].weightType = wType;
      grid[r][c].weight = wVal;
    }
  }
};

export default RandomWeightMaze;
