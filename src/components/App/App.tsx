import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, SignUp, SignIn } from "routes";
import CssBaseline from "@material-ui/core/CssBaseline";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
