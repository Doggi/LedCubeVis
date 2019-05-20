/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as THREE from "three";
import AddFrame from "./AddFrame.js";

class Frame extends Component {
  render() {
    const { num, image } = this.props;
    return (
      <>
        <Col
          className={
            this.props.cubeIndex === num
              ? "frameWidth border border-success"
              : "frameWidth"
          }
        >
          <Card className="card-block h-100">
            <Card.Body onClick={() => this.props.setCubeByIndex(num)}>
              <div
                className="h-100"
                ref={mount => {
                  this.mount = mount;
                }}
              />
            </Card.Body>
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
