/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.setAxis(value);
  }

  render() {
    return (
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
    );
  }
}
export default Menu;
