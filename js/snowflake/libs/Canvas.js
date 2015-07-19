/**
 * Wrapper on canvas API
 * @type {{CanvasContext}}
 */
SNOWFLAKE.canvas = (function () {

    var instance;

    function Context() {
        this.canvas = $('#canvas');
        this.canvasObject = document.getElementById('canvas');
        this.ctx = this.canvasObject.getContext("2d");

        this.canvasWidth = this.canvasObject.width;
        this.canvasHeight = this.canvasObject.height;
        this.canvasOffset = this.canvas.offset();
        this.offsetX = this.canvasOffset.left;
        this.offsetY = this.canvasOffset.top;

        this.isMousePressed = false;
        this.startX = 0;
        this.startY = 0;
        this.lastX = 0;
        this.lastY = 0;

        this.operationMode = 'draw'; // can be draw, select
        this.drawMode = 'line'; // can be line, circle, rectangle

        this.shapesStorage = [];
        this.currentShape = {};
    }

    Context.getInstance = function() {
        if(!instance) {
            instance = new Context();
        }
        return instance;
    };
/*
    Context.prototype.saveState = function() {
        return JSON.stringify(this.getShapesStorage());
    };

    Context.prototype.restoreState = function(string) {
        var objectsArray = JSON.parse(string);

        var _shapesStorage = [];

        objectsArray.forEach(function(item) {

            var shape = new item.type();
            shape.init()
            _shapesStorage.push(shape);
        });
    };
*/
    Context.prototype.setDrawMode = function(mode) {
        this.drawMode = mode;
    };

    Context.prototype.setOperationMode = function(mode) {
        this.operationMode = mode;
    };

    Context.prototype.addShape = function() {
        if (this.currentShape instanceof SNOWFLAKE.shapes.AbstractShape.AbstractShape) {
            this.shapesStorage.push(this.currentShape);
        }

        SNOWFLAKE.Helpers.log(this.shapesStorage);
    };

    Context.prototype.getShapesStorage = function() {
        return this.shapesStorage;
    };

    Context.prototype.setShapesStorage = function(shapesArray) {
        this.shapesStorage = shapesArray;
        SNOWFLAKE.Helpers.log(this.shapesStorage);
    };

    Context.prototype.setCurrentShape = function(shape) {
        this.currentShape = shape;
    };

    Context.prototype.redrawCanvas = function ()
    {
        var operationMode = this.operationMode;

        this.shapesStorage.forEach(function(shape) {
            shape.draw();

            if(operationMode == 'select' && shape._isSelected) {
                shape.drawSelectFrame();
            }
        });

        SNOWFLAKE.Helpers.log(this.shapesStorage);
    };

    Context.prototype.unselectAll = function ()
    {
        this.shapesStorage.forEach(function(shape) {
            shape.setSelected(false);
        });

        this.clearAll();
        this.redrawCanvas();
    };

    Context.prototype.clearAll = function() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };

    Context.prototype.setStrokeStyle = function(style) {
        this.ctx.strokeStyle = style;
    };

    Context.prototype.setLineWidth = function(lineWidth) {
        this.ctx.lineWidth = lineWidth;
    };

    Context.prototype.setFillStyle = function(fillStyle) {
        this.ctx.fillStyle = fillStyle;
    };

    Context.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    };

    Context.prototype.rect = function(a, b, x, y) {
        this.ctx.rect(a, b, x, y);
    };

    Context.prototype.line = function(a, b, x, y) {
        this.ctx.moveTo(a, b);
        this.ctx.lineTo(x, y);
    };

    Context.prototype.beginPath = function() {
        this.ctx.beginPath();
    };

    Context.prototype.closePath = function() {
        this.ctx.closePath();
    };

    Context.prototype.stroke = function() {
        this.ctx.stroke();
    };

    Context.prototype.fill = function() {
        this.ctx.fill();
    };

    Context.prototype.isPointInPath = function(x, y) {
        return this.ctx.isPointInPath(x, y);
    };


    return {
        Context: Context
    };
}());
