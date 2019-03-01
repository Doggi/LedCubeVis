import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Menu from "./component/Menu.js";
import Sketch from "./component/Sketch.js";
import Frames from "./component/Frames.js";
import "./slate.bootstrap.min.css";
import "./App.css";

/**
  define fontawesome icons
 */
library.add(faPlus, faTrash);

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cubes: [0, 1, 2],
      axis: "x"
    };

    this.setAxis = this.setAxis.bind(this);
    this.removeCube = this.removeCube.bind(this);
    this.addCubeAt = this.addCubeAt.bind(this);
  }

  setAxis(axis: string) {
    this.setState({ axis: axis });
    console.log(axis);
  }

  removeCube(position: number) {
    console.log("remove cube at position " + position);
    let cubes = this.state.cubes;
    cubes.splice(position, 1);
    this.setState({ cubes: cubes });
    console.log(cubes);
  }

  addCubeAt(position: number) {
    console.log("add cube at position " + position);
    let begin = this.state.cubes.slice(0, position + 1);
    let end = this.state.cubes.slice(position + 1);
    this.setState({ cubes: [...begin, "addedAfter" + position, ...end] });
  }

  render() {
    return (
      <Container fluid="true" className="h-100">
        <Row noGutters="true" className="h-75">
          <Col lg="2" md="2" sm="2" xl="2" xs="2" className="h-100">
            <Menu setAxis={this.setAxis} axis={this.state.axis} />
          </Col>
          <Col lg="10" md="10" sm="10" xl="10" xs="10" className="h-100">
            <Sketch />
          </Col>
        </Row>
        <Row noGutters="true" className="h-25">
          <Col lg="12" md="12" sm="12" xl="12" xs="12" className="h-100">
            <Frames
              cubes={this.state.cubes}
              removeCube={this.removeCube}
              addCubeAt={this.addCubeAt}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
