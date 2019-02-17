let cubeSketch = function(p) {
  
  p.easycam;
  cubeFrames = [];
  p.currentCube;
  p.currentFrame = 0;
  p.translateVetor;
  p.selectedRow = 0;
  p.axisRadion;
  p.output;
  p.showSelectedRow = true;
  p.buttons = [];
  p.sliderRow;
  p.avenir;
  p.totalFrameInput;
  p.refreshIntervalId;

  p.cubeWidth;

  p.preload = function() {
    p.avenir = p.loadFont("Avenir.otf");
  };

  p.setup = function() {
    cubeFrames[p.currentFrame] = new LedCube({ leds: config.cubeNumber, p5: p });
    p.currentCube = cubeFrames[p.currentFrame];
    let parentSize = p.select("#cube").size();
    p.createCanvas(parentSize.width, parentSize.height, p.WEBGL);

    p.textFont(p.avenir);

    p.setAttributes("antialias", true);

    p.easycam = p.createEasyCam();
    p.easycam.setDistance(getCubeWidth() * 1.5);
    p.easycam.setDistanceMax(getCubeWidth() * 3);
    p.easycam.setDistanceMin(getCubeWidth() * 0.1);

    p.frameRate(config.frameRate);

    let trans = getCubeWidth() / 2;
    p.translateVetor = p.createVector(-trans, -trans, -trans);

    createControlPanel();
  };

  p.draw = function() {
    p.selectedRow = p.slider.value();
    p.buttons.forEach(b => {
      let axis = p.axisRadion.value();
      let numb = parseInt(b.id());
      let led = p.currentCube.getLed(byAxis(axis, numb));
      b.checked(led.isOn());
    });

    p.currentCube = cubeFrames[p.currentFrame];

    p.background(32);

    p.push();
    p.translate(p.translateVetor);
    p.strokeWeight(1);
    p.stroke(255, 32, 0);
    p.line(0, 0, 0, getCubeWidth(), 0, 0);
    p.stroke(32, 255, 32);
    p.line(0, 0, 0, 0, getCubeWidth(), 0);
    p.stroke(0, 32, 255);
    p.line(0, 0, 0, 0, 0, getCubeWidth());

    p.noStroke();

    p.currentCube.array().forEach((led, index) => {
      p.push();

      p.translate(
        (config.cubeLedSize + config.cubeSpace) * led.vector().x,
        (config.cubeLedSize + config.cubeSpace) * led.vector().y,
        (config.cubeLedSize + config.cubeSpace) * led.vector().z
      );

      if (
        p.showSelectedRow &&
        led.vector()[p.axisRadion.value()] == p.selectedRow
      ) {
        p.stroke(255, 204, 100);
      }

      if (led.isOn()) {
        p.specularMaterial(99, 181, 33, 300);
      } else {
        p.specularMaterial(255, 255, 255, 5);
      }

      if (config.showBoxes) {
        p.box(config.cubeLedSize);
      } else {
        //ambientLight(color(11, 60, 191));
        //pointLight(color(11, 60, 191), createVector(0,0,0))
        p.sphere(config.cubeLedSize / 2);
      }

      if (config.DEBUG) {
        p.fill(255, 255, 255);
        p.textSize(config.cubeLedSize / 2);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(index, 0, 0);
        p.textSize(config.cubeLedSize / 4);
        p.text(led.pos.array().toString(), 0, config.cubeLedSize / 3);
      }
      p.pop();
    });
    p.pop();
  };

  function getGLInfo() {
    var gl = p._renderer.GL;

    var info = easycam.getState();
    info.frameRate = frameRate();
    info.gl = gl;

    var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      info.gpu_renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      info.gpu_vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    }
    info.wgl_renderer = gl.getParameter(gl.RENDERER);
    info.wgl_version = gl.getParameter(gl.VERSION);
    info.wgl_glsl = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
    info.wgl_vendor = gl.getParameter(gl.VENDOR);

    return info;
  }

  function createControlPanel() {
    let controlpanel = p.select("#controlpanel");
    p.slider = p.createSlider(0, p.currentCube.config.leds - 1, 0, 1);
    p.slider.id("rowSlider");
    controlpanel.child(p.slider);

    let c = 0;
    for (let i = 0; i < p.currentCube.config.leds; i++) {
      let d = p.createDiv();
      d.class("checkboxRow");
      for (let j = 0; j < p.currentCube.config.leds; j++) {
        let b = p.createCheckbox("", false);
        b.id(c);
        b.class("checkbox");
        b.changed(function() {
          let axis = p.axisRadion.value();
          let numb = parseInt(this.id());
          let checked = this.checked();
          p.currentCube.getLed(byAxis(axis, numb)).setStatus(checked);
        });
        p.buttons.push(b);
        d.child(b);
        c++;
      }
      controlpanel.child(d);
    }

    p.axisRadion = p.createRadio();
    p.axisRadion.option("X", "x");
    p.axisRadion.option("Y", "y");
    p.axisRadion.option("Z", "z");
    p.axisRadion.value("x");
    controlpanel.child(p.axisRadion);

    let addFrameButton = p.createButton("add Frame");
    addFrameButton.mousePressed(function() {
      cube.push(new LedCube({ leds: config.cubeNumber }));
      p.currentFrame++;
      p.currentFrameInput.html(cubeFrames.length);
      totalFrameInput.html(cubeFrames.length);
    });
    controlpanel.child(addFrameButton);
    let removeFrameButton = p.createButton("remove Frame");
    removeFrameButton.mousePressed(function() {
      cubeFrames.splice(p.currentFrame, 1);
      p.currentFrame--;
      p.currentFrameInput.html(cubeFrames.length);
      totalFrameInput.html(cubeFrames.length);
    });
    controlpanel.child(removeFrameButton);
    controlpanel.child(p.createElement("br"));

    let startFrameButton = p.createButton("<<");
    startFrameButton.mousePressed(function() {
      currentFrame = 0;
      currentFrameInput.html(currentFrame + 1);
    });
    controlpanel.child(startFrameButton);

    let beforeFrameButton = p.createButton("<");
    beforeFrameButton.mousePressed(function() {
      p.currentFrame = p.currentFrame <= 0 ? 0 : p.currentFrame - 1;
      p.currentFrameInput.html(p.currentFrame + 1);
    });
    controlpanel.child(beforeFrameButton);

    let currentFrameInput = p.createSpan(p.currentFrame + 1);
    controlpanel.child(currentFrameInput);
    controlpanel.child(p.createSpan("/"));
    totalFrameInput = p.createSpan(p.currentFrame + 1);
    controlpanel.child(totalFrameInput);

    let afterFrameButton = p.createButton(">");
    afterFrameButton.mousePressed(function() {
      p.currentFrame =
        p.currentFrame + 1 >= cubeFrames.length
          ? p.currentFrame
          : p.currentFrame + 1;
      currentFrameInput.html(currentFrame + 1);
    });
    controlpanel.child(afterFrameButton);

    let endFrameButton = p.createButton(">>");
    endFrameButton.mousePressed(function() {
      currentFrame = cube.length - 1;
      currentFrameInput.html(currentFrame + 1);
    });
    controlpanel.child(endFrameButton);

    let showSelectedRowCheckbox = p.createCheckbox(
      "show slected row",
      p.showSelectedRow
    );
    showSelectedRowCheckbox.changed(function() {
      p.showSelectedRow = this.checked();
    });
    controlpanel.child(showSelectedRowCheckbox);
    output = p.createInput("", "text");
    controlpanel.child(output);

    controlpanel.child(p.createElement("br"));

    let saveButton = p.createButton("save");
    saveButton.mousePressed(function() {
      output.value(JSON.stringify(cubeFrames.map(c => c.json())));
    });
    controlpanel.child(saveButton);
    let loadButton = p.createButton("load");
    loadButton.mousePressed(function() {
      let input = JSON.parse(p.output.value());
      cubeFrames = [];
      input.forEach(c => {
        let _c = new LedCube({ leds: Math.ceil(Math.pow(c.length, 1 / 3)) });
        c.forEach(led => {
          _c.getLed(led.pos.x, led.pos.y, led.pos.z).setStatus(led.on);
        });
        cubeFrames.push(_c);
      });
      p.currentCube = cubeFrames[0];
      totalFrameInput.html(cubeFrames.length);
    });
    controlpanel.child(loadButton);

    let downloadButton = p.createButton("download");
    downloadButton.mousePressed(function() {
      saveJson(cubeFrames.map(c => c.json()), "cubes.json");
    });
    controlpanel.child(downloadButton);

    controlpanel.child(p.createElement("br"));
    let startButton = p.createButton("Start");
    startButton.mousePressed(function() {
      p.refreshIntervalId = setInterval(function() {
        p.currentFrame = (p.currentFrame + 1) % cubeFrames.length;
      }, 500);
    });
    controlpanel.child(startButton);

    let stopButton = p.createButton("Stop");
    stopButton.mousePressed(function() {
      clearInterval(p.refreshIntervalId);
    });
    controlpanel.child(stopButton);
  }

  function byAxis(axis, id) {
    let _x, _y, _z;
    switch (axis) {
      case "x":
        _x = p.selectedRow;
        _y = p.floor(id / p.currentCube.config.leds);
        _z = p.floor(id % p.currentCube.config.leds);
        break;
      case "y":
        _x = p.floor(id % p.currentCube.config.leds);
        _y = p.selectedRow;
        _z = p.floor(id / p.currentCube.config.leds);
        break;
      case "z":
        _x = p.floor(id % p.currentCube.config.leds);
        _y = p.floor(id / p.currentCube.config.leds);
        _z = p.selectedRow;
        break;
    }
    return p.createVector(_x, _y, _z);
  }

  function getCubeWidth() {
    p.cubeWidth =
      (config.cubeLedSize + config.cubeSpace) * p.currentCube.config.leds -
      config.cubeSpace;
    return p.cubeWidth;
  }
};
