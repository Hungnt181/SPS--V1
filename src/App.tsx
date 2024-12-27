import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LayoutWebsite from "@views/website/layout";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={LayoutWebsite} />
          <Route path="/all" component={LayoutWebsite} />
          <Route path="/waiting" component={LayoutWebsite} />
          <Route path="/done" component={LayoutWebsite} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
