import PathfindingVisualizer from "./components/PathfindingVisualizer";
import './styles/global.css'
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider withNormalizeCSS>
      <PathfindingVisualizer></PathfindingVisualizer>
    </MantineProvider>
  );
}

export default App;
