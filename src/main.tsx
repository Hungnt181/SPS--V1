import ReactDOM from "react-dom";
import App from "./App";
import { Provider, teamsTheme } from "@fluentui/react-northstar";
ReactDOM.render(
  <Provider theme={teamsTheme}>
    <App />
  </Provider>,
  document.getElementById("root")
);
