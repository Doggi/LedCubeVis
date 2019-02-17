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
config = $.extend({}, config, configLoad());

/**
global function calls for ui
 */
$(".collapse").collapse();
$("#sortableFrames").sortable({});

function configSave() {
    localStorage.setItem("cubeConfig", JSON.stringify(config))
};

function configLoad() {
    return JSON.parse(localStorage.getItem("cubeConfig")) || {};
};

function appendFrame(templateParams, after) {
    let template = $("#frameTemplate").html();
    let tmp = $(nano(template, templateParams));
    tmp = $(tmp);
    if (after) {
        tmp.insertAfter(after);
    } else {
        $("#sortableFrames").append(tmp);
    }
    tmp.find("#delteFrame" + templateParams.frame_number).click(function () {
        cubeFrames.slice(templateParams.frame_number - 1, 1);
        $("#frame" + templateParams.frame_number).remove();
    });
    tmp.find("#addFrame" + templateParams.frame_number).click(function () {
        appendFrame({
            frame_number: templateParams.frame_number + 1,
            img_src: ""
        }, "#frame" + templateParams.frame_number);
    });
    return tmp;
}

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


/**
 * test
 */
appendFrame({
    frame_number: cubeFrames.length,
    img_src: ""
});