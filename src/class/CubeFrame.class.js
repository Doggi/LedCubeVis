import * as THREE from "three";

const CONFIG = {
  LEDS: 8
};

export default class CubeFrame {
  "use strict";

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
          this.leds[x][y][z] = new Led(x, y, z);
        }
      }
    }
  }

  /** @return Led */
  getLed(x, y, z) {
    if (x instanceof THREE.Vector3 && y === undefined && z === undefined) {
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

export class Led {
  constructor(x, y, z) {
    this.pos = new THREE.Vector3(x, y, z);
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
