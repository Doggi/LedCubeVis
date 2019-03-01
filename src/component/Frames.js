/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Frame from "./Frame.js";
import AddFrame from "./AddFrame.js";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Frames extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }
  render() {
    return (
      <Container fluid className="h-100">
        <Row noGutters className="flex-row flex-nowrap overflow-x-row h-100">
          <AddFrame key={-1} num={-1} addCubeAt={this.props.addCubeAt} />
          {this.props.cubes.map((m, k) => (
            <Frame
              key={k}
              num={k}
              numTotal={this.props.cubes.lenght}
              image={m}
              removeCube={this.props.removeCube}
              addCubeAt={this.props.addCubeAt}
            />
          ))}
        </Row>
      </Container>
    );
  }
}
export default Frames;
