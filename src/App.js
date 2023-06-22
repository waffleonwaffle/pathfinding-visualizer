import PathfindingVisualizer from "./components/PathfindingVisualizer";
import "./styles/global.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <MantineProvider withNormalizeCSS>
        <PathfindingVisualizer></PathfindingVisualizer>
      </MantineProvider>
    </Provider>
  );
}

export default App;
