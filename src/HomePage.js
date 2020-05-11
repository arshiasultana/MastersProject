import React, { Component } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
//import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { createBrowserHistory } from 'history'

//import { Route, Switch } from 'react-router-dom';
// import { browserHistory } from "react-router";
import { withRouter } from 'react-router';
import YearDropdown from './YearDropdown'
import ChartWrapper2019 from './YearCharts/ChartWrapper_2019';




class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { year: "" };
    }

    yearSelected = (year) => this.setState({ year })

    render() {
        return (
            <div>
                <YearDropdown yearSelected={this.yearSelected} />

                <ChartWrapper2019 year={this.state.year} />
            </div >
        );
    }
}

export default withRouter(HomePage);


