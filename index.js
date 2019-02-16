/**
global variables
 */
let cubeFrames = [];

let config = {
    cubeNumber: 8,
    cubeLedSize: 5,
    cubeSpace: 19,
    frameRate: 30,
    showBoxes: false
};
console.log(configLoad());

config = $.extend({}, config, configLoad());

console.log(config);

/**
global function calls for ui
 */
$(".collapse").collapse();

function configSave() {
    localStorage.setItem("cubeConfig", JSON.stringify(config))
};

function configLoad() {
    return JSON.parse(localStorage.getItem("cubeConfig")) || {};
};

$("#ipCubeNumber").val(config.cubeNumber).change(function () {
    config.cubeNumber = Number($(this).val());
    configSave();
});
$("#ipCubeLedSize").val(config.cubeLedSize).change(function () {
    config.cubeLedSize = Number($(this).val());
    configSave();
});
$("#ipCubeSpace").val(config.cubeSpace).change(function () {
    config.cubeSpace = Number($(this).val());
    configSave();
});
$("#ipFrameRate").val(config.frameRate).change(function () {
    config.frameRate = Number($(this).val());
    configSave();
});
$("#ipShowBoxes").prop("checked", config.showBoxes).change(function () {
    config.showBoxes = $(this).prop("checked");
    configSave();
});


/**
start with cube builder app
 */
new p5(cubeSketch, "cube");