import React, { Component } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { createBrowserHistory } from 'history'

// import { Route, Switch } from 'react-router-dom';
// import { browserHistory } from "react-router";
import { withRouter } from 'react-router';
import BoroughDropdown from './BoroughDropdown'
import ChartWrapperBorough from '../BoroughCharts/ChartWrapperBorough';






class Borough extends Component {

    state = {
        borough: "Manhattan"
    }
    boroughSelected = (borough) => this.setState({ borough })

    render() {
        return (
            <div>
                <BoroughDropdown boroughSelected={this.boroughSelected} />

                <ChartWrapperBorough borough={this.state.borough} />

            </div >
        );
    }
}

export default withRouter(Borough);


