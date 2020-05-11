import React, { Component } from "react";
// import Select from "react-select";
// import "./App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

class PredictionUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            formData: {
                borough: 1,
                building: 1,
                lsf: 1,
                gsf: 1,
                cu: 0,
                ru: 0,
            },
            result: "",
        };
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        var formData = this.state.formData;
        formData[name] = value;
        this.setState({
            formData,
        });
    };

    handlePredictClick = (event) => {
        const formData = this.state.formData;
        this.setState({ isLoading: true });
        fetch("http://127.0.0.1:5000/prediction", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formData),

        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    // result: response.result,
                    result: Math.round(response.result),
                    isLoading: false,
                });
                // console.log("Response received from Flask :");
                console.log(response);
            });
        console.log(formData);
    };

    handleCancelClick = (event) => {
        this.setState({ result: "" });
    };

    render() {
        const isLoading = this.state.isLoading;
        const formData = this.state.formData;
        const result = this.state.result;


        var borough = ["Manhattan", "Bronx", "Brooklyn", "Queens", "Staten Island"],
            item = function (x) {
                return <option>{x}</option>;
            };
        var building = [
            "THREE FAMILY DWELLINGS",
            "ONE FAMILY DWELLINGS",
            "RENTALS - 4-10 UNIT",
            "RENTALS - WALKUP APARTMENTS",
            "TWO FAMILY DWELLINGS",
            "TAX CLASS 4 - OTHER",
            "LOFT BUILDINGS",
            "STORE BUILDINGS",
            "SPECIAL CONDO BILLING LOTS",
            "INDOOR PUBLIC AND CULTURAL FACILITIES",
            "RENTALS - ELEVATOR APARTMENTS",
            "RELIGIOUS FACILITIES",
            "OFFICE BUILDINGS",
            "COMMERCIAL GARAGES",
            "WAREHOUSES",
            "CONDO PARKING",
            "CONDOS - ELEVATOR APARTMENTS",
            "CONDOS - 2-10 UNIT RESIDENTIAL",
            "CONDOS - WALKUP APARTMENTS",
            "TAX CLASS 1 CONDOS",
            "HOSPITAL AND HEALTH FACILITIES",
            "FACTORIES",
            "OTHER HOTELS",
        ],
            item1 = function (x) {
                return <option>{x}</option>;
            };

        var lsf = [];
        for (var i = 1; i <= 20000; i = +(i + 100).toFixed(1)) {
            lsf.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        var ru = [];
        for (i = 1; i <= 30; i = +(i + 1).toFixed(1)) {
            ru.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        var cu = [];
        for (i = 1; i <= 20; i = +(i + 1).toFixed(1)) {
            cu.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        var gsf = [];
        for (i = 0; i <= 5; i = +(i + 1).toFixed(1)) {
            gsf.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return (
            <Container>
                <div>
                    <h1 className="title">SALES PREDICTION</h1>
                </div>
                <div className="content">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>BOROUGH</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.borough}
                                    name="borough"
                                    onChange={this.handleChange}
                                >
                                    {borough.map(item)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>BUILDING CLASS CATEGORY</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.building}
                                    name="building"
                                    onChange={this.handleChange}
                                >
                                    {building.map(item1)}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>LAND SQUARE FEET</Form.Label>

                                <Form.Control
                                    type="Number"
                                    // value="100"
                                    name="lsf"
                                    onChange={this.handleChange}
                                >
                                    {/* {lsf} */}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>GROSS SQUARE FEET</Form.Label>
                                <Form.Control
                                    type="Number"
                                    // value="100"
                                    name="gsf"
                                    onChange={this.handleChange}
                                >
                                    {/* {gsf} */}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>RESIDENTIAL UNITS</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.ru}
                                    name="ru"
                                    onChange={this.handleChange}
                                >
                                    {ru}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>COMMERCIAL UNITS</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.cu}
                                    name="cu"
                                    onChange={this.handleChange}
                                >
                                    {cu}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Row>
                            <Col>
                                <Button
                                    block
                                    variant="success"
                                    disabled={isLoading}
                                    onClick={!isLoading ? this.handlePredictClick : null}
                                >
                                    {isLoading ? "Making prediction" : "Predict"}
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    block
                                    variant="danger"
                                    disabled={isLoading}
                                    onClick={this.handleCancelClick}
                                >
                                    Reset prediction
                </Button>
                            </Col>
                        </Row>
                    </Form>
                    {result === "" ? null : (
                        <Row>
                            <Col className="result-container">
                                <br></br>
                                <h5 id="result">The Predicted Sale Price is ${result}</h5>
                            </Col>
                        </Row>
                    )}
                </div>
            </Container>
        );
    }
}

export default PredictionUI;
