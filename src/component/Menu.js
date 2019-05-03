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
          {this.props.cube.arrays().map(arr => (
            <ToggleButtonGroup type="checkbox" size="sm" className="w-100">
              {arr.map((led, k) => (
                <ToggleButton value={k}>{k + 1}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          ))}
        </ButtonToolbar>
      </>
    );
  }
}
export default Menu;
