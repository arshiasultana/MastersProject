import React, { Component } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ChartWrapper from './ChartWrapper';
// import ChartWrapper1 from './ChartWrapper1';
// import { createBrowserHistory } from 'history'
// import Page1 from './Page1';
import { Route, Switch } from 'react-router-dom';
// import { browserHistory } from "react-router";
import { withRouter } from 'react-router';
// import YearDropdown from './Dropdown'; 
import { Link } from 'react-router-dom';
import PredictionUI from './PredictionUI';
import ChartWrapper_2019 from './2019/ChartWrapper_2019';
import ChartWrapper_2018 from './2018/ChartWrapper_2018';




class HomePage extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={1}>select Year
                    {/* <Link to="/2018" replace>2018 </Link> */}
                        {/* <Link to="/">2017 </Link>
                        <Link to="/predictionUI">2016 </Link>
                        <Link to="/predictionUI">2016 </Link></Col> */}






                        <Col>Here Comes the charts 2019 charts<ChartWrapper_2019 />
                            {/* <Col><ChartWrapper_2018 /></Col> */}
                        </Col>







                        <Col xs={1}>Visualize Sales Trends for each Borough in 2019
                    <Link to="/second">Manhattan </Link>
                            {/* <Link to="/">Bronx </Link>
                        <Link to="/predictionUI">Brooklyn </Link>
                        <Link to="/predictionUI">Queens </Link>
                        <Link to="/predictionUI">Staten Island </Link></Col> */}
                        </Col>
                </Row>


                    {/* <Navbar bg="light">

                    <Link to="/second">Second </Link>
                    <Link to="/">Home </Link>
                    <Link to="/predictionUI">Predictions </Link>
                </Navbar>
                <Container>
                    {/* <Row>q
                        <Col><PredictionUI /></Col>
                    </Row> */}
                    {/* <Switch>
                    <Route exact path="/2018" component={ChartWrapper_2018} />
                    <Route exact path="/predictionUI" component={PredictionUI} />
                    {/* <Route exact path="/second" component={ChartWrapper1} />
                        <Route exact path="/predictionUI" component={PredictionUI} /> */}
                    {/* </Switch> 
                {/* </Container> */ }
            </div >
                );
            }
        }
        
        export default withRouter(HomePage);
        
        
