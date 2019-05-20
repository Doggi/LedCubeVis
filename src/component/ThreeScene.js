import React, { Component } from "react";
import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";

class ThreeScene extends Component {
  componentDidMount() {
    let interval = setInterval(() => {
      if (this.mount.clientHeight !== 123) {
        clearInterval(interval);
        this.componentRendered();
      }
    }, 100);
  }

  componentRendered() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.ledMap = {};
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    this.camera.position.z = 210;
    this.controls = new OrbitControls(this.camera, this.mount);
    this.controls.minDistance = 100;
    this.controls.maxDistance = 300;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //ADD LIGHT
    var light = new THREE.AmbientLight(0xffffff);
    light.position.set(0, 0, this.camera.position.z);
    this.scene.add(light);
    //ADD CUBE
    const geometry = new THREE.SphereGeometry(5, 8, 8, 0, 6.3, 0, 3.1);
    const materialOn = new THREE.MeshLambertMaterial({ color: 0xffd300 });
    const materialOff = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.05,
      color: 0xffd300,
      wireframe: false
    });
    const materialSelectedOff = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      wireframe: true
    });
    const materialSelectedOn = new THREE.MeshLambertMaterial({
      color: 0xffff00
    });
    this.materialOn = materialOn;
    this.materialOff = materialOff;
    this.materialSelectedOff = materialSelectedOff;
    this.materialSelectedOn = materialSelectedOn;
    let setOff = (this.props.cube.config.leds / 2) * 15;

    this.props.cube.array().forEach((led, index) => {
      let material = led.isOn() ? materialOn : materialOff;
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        led.vector().x * 15 - setOff + 7.5,
        led.vector().y * 15 - setOff + 7.5,
        led.vector().z * 15 - setOff + 7.5
      );

      this.scene.add(mesh);
      this.ledMap[
        `${led.vector().x}_${led.vector().y}_${led.vector().z}`
      ] = mesh;
    });

    this.controls.update();
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.updateSize();
    this.props.cube.array().forEach(led => {
      let ledMesh = this.ledMap[
        `${led.vector().x}_${led.vector().y}_${led.vector().z}`
      ];
      ledMesh.material = led.isOn() ? this.materialOn : this.materialOff;

      let axis = this.props.axis;
      let row = this.props.row;
      if (this.props.viewSelectedRow) {
        if (axis === "x" && led.vector().x === row) {
          ledMesh.material = led.isOn()
            ? this.materialSelectedOn
            : this.materialSelectedOff;
        } else if (axis === "y" && led.vector().y === row) {
          ledMesh.material = led.isOn()
            ? this.materialSelectedOn
            : this.materialSelectedOff;
        } else if (axis === "z" && led.vector().z === row) {
          ledMesh.material = led.isOn()
            ? this.materialSelectedOn
            : this.materialSelectedOff;
        }
      }
    });
    this.renderer.render(this.scene, this.camera);
  };

  updateSize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.renderer.setSize(width, height);
  };

  render() {
    return (
      <div
        className="h-100"
        style={{ height: "123px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;
