import React from 'react';
// import { browserHistory } from 'react-router';
// import { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';




export default function YearDropdown({ yearSelected }) {


    return (


        < Dropdown >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Year
                </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onSelect={() => yearSelected("2019")}>2019</Dropdown.Item>
                <Dropdown.Item onSelect={() => yearSelected("2018")}>2018</Dropdown.Item>
                <Dropdown.Item onSelect={() => yearSelected("2017")}>2017</Dropdown.Item>
                <Dropdown.Item onSelect={() => yearSelected("2016")}>2016</Dropdown.Item>
                <Dropdown.Item onSelect={() => yearSelected("2015")}>2015</Dropdown.Item>

                {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
            </Dropdown.Menu>
        </Dropdown >
    )

}
