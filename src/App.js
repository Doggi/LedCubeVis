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
      cube: initCube,
      cubeIndex: 0,
      row: 0,
      viewSelectedRow: true
    };
  }

  setCurrentCube = cube => {
    this.setState({ cube });
  };

  setCubeByIndex = index => {
    this.setState({ cube: this.state.cubes[index], cubeIndex: index });
  };

  setAxis = axis => {
    let cube = this.state.cube;
    this.setState({ axis, cube });
  };

  setSelectedRow = row => {
    this.setState({ row });
  };

  changeLedStatus = vector => {
    let cube = this.state.cube;
    let led = cube.getLed(vector._x, vector._y, vector._z);
    led.setStatus(!led.isOn());
    this.setCurrentCube(cube);
  };

  removeCube = position => {
    let cubes = [...this.state.cubes];
    cubes.splice(position, 1);
    if (cubes.length === 0) {
      cubes = [new CubeFrame({ leds: this.state.ledsCount })];
    }
    let cubeIndex = Math.max(0, Math.min(position, cubes.length - 1));
    this.setState({
      cube: cubes[cubeIndex],
      cubes,
      cubeIndex
    });
  };

  addCubeAt = position => {
    let begin = this.state.cubes.slice(0, position + 1);
    let end = this.state.cubes.slice(position + 1);
    this.setState({
      cubes: [...begin, new CubeFrame({ leds: this.state.ledsCount }), ...end]
    });
    if (position < this.state.cubeIndex) {
      this.setState({ cubeIndex: this.state.cubeIndex + 1 });
    }
  };

  changeViewSelectedRow = event => {
    this.setState({ viewSelectedRow: !this.state.viewSelectedRow });
  };

  render() {
    return (
      <Container fluid="true" className="h-100 px-0">
        <Row noGutters="true" className="h-75">
          <Col lg="2" md="2" sm="2" xl="2" xs="2" className="h-100">
            <Menu
              setAxis={this.setAxis}
              setSelectedRow={this.setSelectedRow}
              changeLedStatus={this.changeLedStatus}
              axis={this.state.axis}
              cube={this.state.cube}
              viewSelectedRow={this.state.viewSelectedRow}
              changeViewSelectedRow={this.changeViewSelectedRow}
            />
          </Col>
          <Col lg="10" md="10" sm="10" xl="10" xs="10" className="h-100">
            <ThreeScene
              cube={this.state.cube}
              axis={this.state.axis}
              row={this.state.row}
              viewSelectedRow={this.state.viewSelectedRow}
            />
          </Col>
        </Row>
        <Row noGutters="true" className="h-25">
          <Col lg="12" md="12" sm="12" xl="12" xs="12" className="h-100">
            <Frames
              cubes={this.state.cubes}
              removeCube={this.removeCube}
              addCubeAt={this.addCubeAt}
              setCubeByIndex={this.setCubeByIndex}
              cubeIndex={this.state.cubeIndex}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
