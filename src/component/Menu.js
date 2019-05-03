/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  ButtonToolbar
} from "react-bootstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = value => {
    this.props.setAxis(value);
  };

  handleLedStatus = vector => {
    this.props.changeLedStatus(vector);
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
        let ledVector = this.byAxis(this.props.axis, i * number + j, 0);
        let led = this.props.cube.getLed(
          ledVector._x,
          ledVector._y,
          ledVector._z
        );
        children.push(
          <ToggleButton
            key={i * number + j}
            value={j}
            active={led.isOn()}
            onChange={value => {
              this.handleLedStatus(ledVector);
            }}
          >
            {j}
          </ToggleButton>
        );
      }
      //Create the parent and add the children
      table.push(
        <ToggleButtonGroup key={i} type="checkbox" size="sm" className="w-100">
          {children}
        </ToggleButtonGroup>
      );
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

        <ButtonToolbar>
          {this.createPanel(this.props.cube.config.leds)}
        </ButtonToolbar>
      </>
    );
  }
}
export default Menu;
