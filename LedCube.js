"use strict";

const CONFIG = {
  LEDS: 8
};

class LedCube {
  constructor(config) {
    this.config = config || {};
    this.config.leds = this.config.leds || CONFIG.LEDS;

    this.leds = null;

    this._buildCube();
  }

  _buildCube() {
    this.leds = [];
    for (let x = 0; x < this.config.leds; x++) {
      this.leds[x] = [];
      for (let y = 0; y < this.config.leds; y++) {
        this.leds[x][y] = [];
        for (let z = 0; z < this.config.leds; z++) {
          this.leds[x][y][z] = new Led(x, y, z, this.config.p5);
        }
      }
    }
  }

  _getLedByAxis(axis, id) {
    let _x, _y, _z;
    switch (axis) {
      case "x":
        _x = selectedRow;
        _y = floor(id / cube.config.leds);
        _z = floor(id % cube.config.leds);
        break;
      case "y":
        _x = floor(id % cube.config.leds);
        _y = selectedRow;
        _z = floor(id / cube.config.leds);
        break;
      case "z":
        _x = floor(id % cube.config.leds);
        _y = floor(id / cube.config.leds);
        _z = selectedRow;
        break;
    }
    return this.config.p5.createVector(_x, _y, _z);
  }

  /** @return Led */
  getLed(x, y, z) {
    if (x instanceof p5.Vector && y === undefined && z === undefined) {
      return this.leds[x.x][x.y][x.z];
    } else if (x instanceof Number && y === undefined && z === undefined) {
      return this.leds.array()[x];
    } else {
      return this.leds[x][y][z];
    }
  }

  /**
  return a 1d array
  */
  array() {
    let newArr = [];

    for (var i = 0; i < this.leds.length; i++) {
      for (var j = 0; j < this.leds.length; j++) {
        newArr = newArr.concat(this.leds[i][j]);
      }
    }

    return newArr;
  }
  /**
  return a 3d array
   */
  arrays() {
    return this.leds;
  }

  json() {
    return this.array().map(l => l.json());
  }
}

class Led {
  constructor(x, y, z, p5) {
    this.pos = p5.createVector(x, y, z);
    this.on = false;
  }

  isOn() {
    return this.on;
  }

  /**
@param boolean status
 */
  setStatus(status) {
    this.on = status;
  }

  setOn() {
    this.setStatus(true);
  }

  setOff() {
    this.setStatus(false);
  }

  vector() {
    return this.pos;
  }

  array() {
    return this.pos.array();
  }

  json() {
    return {
      on: this.isOn(),
      pos: { x: this.pos.x, y: this.pos.y, z: this.pos.z }
    };
  }
}
