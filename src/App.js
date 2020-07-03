import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GridMain from "./components/Grid/GridMain";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/grid"}>
          <GridMain />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
