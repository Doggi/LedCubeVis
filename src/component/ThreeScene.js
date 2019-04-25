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
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    this.controls = new OrbitControls(this.camera);
    this.camera.position.z = 100;
    this.controls.update();
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
    const geometry = new THREE.SphereGeometry(5, 16, 16, 0, 6.3, 0, 3.1);
    const materialOff = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.5,
      color: 0xffd300,
      wireframe: true
    });
    const materialOn = new THREE.MeshLambertMaterial({ color: 0xffd300 });

    this.props.cube.array().forEach((led, index) => {
      let material = led.isOn() ? materialOn : materialOff;
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        led.vector().x * 15,
        led.vector().y * 15,
        led.vector().z * 15
      );
      this.scene.add(mesh);
    });
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
