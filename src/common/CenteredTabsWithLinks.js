import React, { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import HomePage from "../HomePage";
import Borough from "../borough/Borough";
import PredictionUI from "../PredictionUI";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      <div className="Tabs">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Paper className={classes.root}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Summary" component={Link} to="/home" />
                  <Tab label="Borough" component={Link} to="/borough" />
                  <Tab label="Try Sales Predictor" component={Link} to="/prediction" />
                </Tabs>
              </Paper>
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


