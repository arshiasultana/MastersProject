import React from 'react';
// import { browserHistory } from 'react-router';
// import { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';




export default function BoroughDropdown({ boroughSelected }) {


    return (


        < Dropdown >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select the Borough
                </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onSelect={() => boroughSelected("Manhattan")}>Manhattan</Dropdown.Item>
                <Dropdown.Item onSelect={() => boroughSelected("Bronx")}>Bronx</Dropdown.Item>
                <Dropdown.Item onSelect={() => boroughSelected("Brooklyn")}>Brooklyn</Dropdown.Item>
                <Dropdown.Item onSelect={() => boroughSelected("Queens")}>Queens</Dropdown.Item>
                <Dropdown.Item onSelect={() => boroughSelected("StatenIsand")}>StatenIsand</Dropdown.Item>

                {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
            </Dropdown.Menu>
        </Dropdown >
    )

}
