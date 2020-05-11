import React, { Fragment } from "react";
import Tabs from "./common/node_modules/@material-ui/core/Tabs";
import Tab from "./common/node_modules/@material-ui/core/Tab";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import Borough from "../Borough";
import PredictionUI from "../PredictionUI";


function TabsWithLinks() {
  return (
    <BrowserRouter>
      <div className="Tabs">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Tabs value={location.pathname}>
                <Tab label="Home" component={Link} to="/home" />
                <Tab label="Borough" component={Link} to="/borough" />
                <Tab label="Sales Prediction" component={Link} to="/prediction" />
              </Tabs>
              <Switch>
                <Route path="/borough" render={() => <Borough />} />
                <Route path="/prediction" render={() => <PredictionUI />} />
                <Route path="/" render={() => <HomePage />} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default TabsWithLinks