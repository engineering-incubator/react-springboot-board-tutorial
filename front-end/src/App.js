import React from "react";
import SignUp from "./signUp/SignUp";
import { Route, Switch } from "react-router-dom";
import LogIn from "./logIn/logIn";
import Navigation from "./components/navigation";
import gateway from "./gateway/gateway";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact={true} component={gateway} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
      </Switch>
    </div>
  );
}

export default App;
