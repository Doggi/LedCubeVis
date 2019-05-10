/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  ButtonToolbar
} from "react-bootstrap";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
      ledStatus: []
    };
    let number = this.props.cube.config.leds;
    for (let i = 0; i < number; i++) {
      for (let j = 0; j < number; j++) {
        for (let l = 0; l < number; l++) {
          //ledStatus[i][j][l] = 1;
        }
      }
    }
  }

  handleChange = value => {
    this.props.setAxis(value);
  };

  handleLedStatus = (vector, value) => {
    this.props.changeLedStatus(vector);
  };

  handleRowChange = value => {
    this.setState({ selectedRow: value });
    this.props.setSelectedRow(value);
  };

  byAxis = (axis, id, selectedRow) => {
    let _x, _y, _z;
    let leds = this.props.cube.config.leds;
    switch (axis) {
      case "x":
        _x = selectedRow;
        _y = Math.floor(id / leds);
        _z = Math.floor(id % leds);
        break;
      case "y":
        _x = Math.floor(id % leds);
        _y = selectedRow;
        _z = Math.floor(id / leds);
        break;
      case "z":
        _x = Math.floor(id % leds);
        _y = Math.floor(id / leds);
        _z = selectedRow;
        break;
    }
    return { _x, _y, _z };
  };

  createPanel = number => {
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < number; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < number; j++) {
        let ledVector = this.byAxis(
          this.props.axis,
          i * number + j,
          this.state.selectedRow
        );
        let led = this.props.cube.getLed(
          ledVector._x,
          ledVector._y,
          ledVector._z
        );
        children.push(
          <ToggleButton
            key={i * number + j}
            value={j}
            onChange={value => {
              this.handleLedStatus(ledVector, value);
            }}
          >
            {j}
          </ToggleButton>
        );
      }
      //Create the parent and add the children
      table = [
        <ToggleButtonGroup key={i} type="checkbox" size="sm" className="w-100">
          {children}
        </ToggleButtonGroup>,
        ...table
      ];
    }
    return table;
  };

  render() {
    return (
      <>
        <ToggleButtonGroup
          type="radio"
          name="axis"
          value={this.props.axis}
          className="w-100"
          size="sm"
          onChange={this.props.setAxis}
        >
          <ToggleButton value="x">X</ToggleButton>
          <ToggleButton value="y">Y</ToggleButton>
          <ToggleButton value="z">Z</ToggleButton>
        </ToggleButtonGroup>
        <div style={{ height: "50px", width: "90%", margin: "20px 5% 0 5%" }}>
          <InputRange
            minValue={0}
            value={this.state.selectedRow}
            maxValue={this.props.cube.config.leds - 1}
            onChange={this.handleRowChange}
          />
        </div>

        <ButtonToolbar>
          {this.createPanel(this.props.cube.config.leds)}
        </ButtonToolbar>
      </>
    );
  }
}
export default Menu;
