import React, { Component } from 'react';
//import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ChartWrapper from './ChartWrapper';
// import ChartWrapper1 from './ChartWrapper1';
// import { createBrowserHistory } from 'history'
// import Page1 from './Page1';
//import { Route, Switch } from 'react-router-dom';
// import { browserHistory } from "react-router";
import { withRouter } from 'react-router';
// import YearDropdown from './Dropdown'; 
//import { Link } from 'react-router-dom';
//import PredictionUI from './PredictionUI';
//import HomePage from './HomePage'

//import Borough from './Borough';
import AutoGrid from './common/AutoGrid'
import CenteredTabsWithLinks from './common/CenteredTabsWithLinks'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/Metrics")
      .then(res => res.json())
      .then((result) => {
        this.setState({
          data: result
        })
      })
  }


  render() {
    return (
      <div>

        <AutoGrid data={this.state.data} />

        <Container fluid>

          <CenteredTabsWithLinks />

        </Container>

      </div >
    );
  }
}

export default withRouter(App);


