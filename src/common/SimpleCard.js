import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 220,
    backgroundColor: "turquoise"
  },
  title: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 30,
    margin: 15,
    textAlign: 'center',
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {props.metric}
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary" variant="h4" component="h2">
          {props.value}
        </Typography>
      </CardContent>
    </Card>
  );
}