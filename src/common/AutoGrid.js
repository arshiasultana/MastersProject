import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SimpleCard from './SimpleCard';


// import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';

// const theme = createMuiTheme({
//   palette: {
//     primary: purple,
//     secondary: green,
//   },
//   status: {
//     danger: 'orange',
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0.2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: '#DFDFDF',
  },
}));

export default function AutoGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg>
          <Paper className={classes.paper} >
            <h2>New York City Property Dashboard and Sales Prediction</h2>
            <p>New to NY and want to buy a property? This BI Dashboard will give you a headstart in planning your investments.!!!</p>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <SimpleCard metric="Years in View" value="2015 to 2019" />
        </Grid>
        <Grid item xs>
          <SimpleCard metric="Totals Sales" value={props.data.TotalSalesInYears} />
        </Grid>
        <Grid item xs>
          <SimpleCard metric="Boroughs" value={props.data.Boroughs} />
        </Grid>
        <Grid item xs>
          <SimpleCard metric="Building Classes" value={props.data.BuildingClasses} />
        </Grid>
      </Grid>
    </div>
  );
}

AutoGrid.propTypes = {
  data: PropTypes.object
} 