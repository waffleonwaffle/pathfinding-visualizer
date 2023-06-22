import { Radio } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
const HeuristicOption = ({
  heuristicLink,
  heuristicName,
  handleHeuristicChange,
}) => {
  return (
    <div className="heuristic-button">
      <Radio
        color="dark"
        className="heuristic-button"
        onClick={handleHeuristicChange}
        value={heuristicName}
        label={heuristicName}
      />
      <a href={heuristicLink} target="_blank" rel="noreferrer">
        <IconInfoCircle color="black" />
      </a>
    </div>
  );
};

export default HeuristicOption;
