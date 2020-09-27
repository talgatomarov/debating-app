import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, SignUp, SignIn, LobbyPage } from "routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import "fontsource-roboto";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          {/* TODO: Change lobby route to private */}
          <Route path="/lobby" component={LobbyPage} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
