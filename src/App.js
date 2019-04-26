import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Menu from "./component/Menu.js";
import Frames from "./component/Frames.js";
import ThreeScene from "./component/ThreeScene.js";
import CubeFrame from "./class/CubeFrame.class.js";
import "./darkly.bootstrap.min.css";
import "./App.css";

/**
  define fontawesome icons
 */
library.add(faPlus, faTrash);

class App extends Component {
  constructor(props, context) {
    super(props, context);
    let initCube = new CubeFrame({ leds: 8 });
    this.state = {
      ledsCount: 8,
      cubes: [initCube],
      axis: "x",
      cube: initCube
    };
  }

  setCurrentCube = cube => {
    this.setState({ cube });
  };

  setAxis = axis => {
    this.setState({ axis });
  };

  removeCube = position => {
    let cubes = this.state.cubes;
    cubes.splice(position, 1);
    this.setState({ cubes });
  };

  addCubeAt = position => {
    let begin = this.state.cubes.slice(0, position + 1);
    let end = this.state.cubes.slice(position + 1);
    this.setState({
      cubes: [...begin, new CubeFrame({ leds: this.state.ledsCount }), ...end]
    });
  };

  render() {
    return (
      <Container fluid="true" className="h-100 px-0">
        <Row noGutters="true" className="h-75">
          <Col lg="2" md="2" sm="2" xl="2" xs="2" className="h-100">
            <Menu
              setAxis={this.setAxis}
              axis={this.state.axis}
              cube={this.state.cube}
            />
          </Col>
          <Col lg="10" md="10" sm="10" xl="10" xs="10" className="h-100">
            <ThreeScene cube={this.state.cube} />
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
