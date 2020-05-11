import React, { Component } from 'react'

import GroupedBar from './GroupedBar';

import line from './line';
import { Container, Row, Card, Col } from 'react-bootstrap'




export default class ChartWrapperBorough extends Component {

    componentDidMount() {
        this.setState({
            chart: new line(this.refs.chart),
            chart1: new GroupedBar(this.refs.chart1)
        })
    }

    shouldComponentUpdate() {
        return false
    }
    componentWillReceiveProps(nextProps) {
        this.state.chart.update(nextProps.borough)
        this.state.chart1.update(nextProps.borough)
        // this.state.chart2.update(nextProps.year)

    }

    render() {

        return (<Container>
            <Row>
                {/* <Col ref="chart" md={9}></Col> */}
                <Col md={12} ref="chart"><Card style={{ width: '60rem' }}>
                    <Card.Body>
                        <Card.Title>Line graph displaying the Sale price for each building class category </Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            Which Building Class Category is most expensive in each borough? What are the trends for sale price for each building class category?
                            <br></br>
                            Observation: Office Buildings and Educational facilities remain the on top of the most expensive building categories for every borough followed by factories.
    </Card.Text>
                        {/* <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                </Card></Col>
            </Row>



            <Row>
                {/* <Col ref="chart1" md={9}></Col> */}
                <Col md={12} ref="chart1">
                    <Card style={{ width: '60rem' }}>
                        <Card.Body>
                            <Card.Title>Grouped Bar Graph displaying the sale price for each building class category </Card.Title>
                            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                            <Card.Text>
                                What has been the median sale price for each building class in the past few years?
    </Card.Text>
                            {/* <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>



        </Container >
        );


    }


}

