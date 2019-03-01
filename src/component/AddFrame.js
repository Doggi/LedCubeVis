/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddFrame extends Component {
  render() {
    const { num, image } = this.props;
    return (
      <Button
        className="add-button"
        variant="success"
        size="sm"
        onClick={() => this.props.addCubeAt(num)}
      >
        <FontAwesomeIcon icon="plus" />
      </Button>
    );
  }
}
export default AddFrame;
