/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddFrame from "./AddFrame.js";

class Frame extends Component {
  render() {
    const { num, image } = this.props;
    return (
      <>
        <Col className="frameWidth">
          <Card className="card-block h-100">
            <Card.Body>{image}</Card.Body>
            <Card.Footer className="text-center">
              #{num + 1}/{this.props.numTotal}
              <Button
                variant="danger"
                size="sm"
                onClick={() => this.props.removeCube(num)}
              >
                <FontAwesomeIcon icon="trash" />
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <AddFrame num={num} addCubeAt={this.props.addCubeAt} />
      </>
    );
  }
}
export default Frame;
