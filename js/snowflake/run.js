(function() {
    var controller = new SNOWFLAKE.controller.Controller();
    var canvasDOM = $('#canvas');
    var helpers = SNOWFLAKE.Helpers;

    canvasDOM.bind('mousedown', function(e) {
        controller.onMouseDown(e);
    });

    canvasDOM.bind('mousemove', function(e) {
        controller.onMouseMove(e);
    });

    canvasDOM.bind('mouseup', function(e) {
        controller.onMouseUp(e);
    });

    canvasDOM.bind('mouseout', function(e) {
        controller.onMouseOut(e);
    });

    $('button.btn-draw-mode').on('click', function() {
        controller.setOperationMode('draw');
        controller.setDrawMode($(this).attr('data-mode'));
    });

    $('button.btn-save').on('click', function() {
        $('#shapes').val(helpers.objects2JSON(controller.getShapesStorage()));
    });

    $('button.btn-load').on('click', function() {
        controller.setShapesStorage(helpers.JSON2Objects($('#shapes').val()));
        controller.redrawCanvas();
    });


    $('button.btn-select-mode').on('click', function() {
        controller.setOperationMode('select');
    });
    /*
    $('button.btn-clear-all').on('click', function() {
        clearCanvas();
    });
    */

}());


