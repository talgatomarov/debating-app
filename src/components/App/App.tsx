import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Register } from "../../routes";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
