/**
 * Created by coolkid on 18.07.15.
 */
SNOWFLAKE.controller = (function () {

    var helpers = SNOWFLAKE.Helpers;
    var canvas = SNOWFLAKE.canvas.Context.getInstance();

    function Controller()
    {
        //this._state = false;
    }


    Controller.prototype.mouseMoveDraw = function(e) {
        var shape = {};

        if (!canvas.isMousePressed) {
            return;
        }

        helpers.stopEvent(e);

        canvas.mouseX = parseInt(e.clientX - canvas.offsetX);
        canvas.mouseY = parseInt(e.clientY - canvas.offsetY);
        canvas.clearAll();

        switch (canvas.drawMode) {

            case 'circle':
                shape = new SNOWFLAKE.shapes.Circle.Circle();
                shape.init(canvas.startX, canvas.startY, canvas.mouseX, canvas.mouseY);
                break;

            case 'line':
                shape = new SNOWFLAKE.shapes.Line.Line();
                shape.init(canvas.startX, canvas.startY, canvas.mouseX, canvas.mouseY);
                break;

            case 'rectangle':
                shape = new SNOWFLAKE.shapes.Rectangle.Rectangle();
                shape.init(canvas.startX, canvas.startY, canvas.mouseX, canvas.mouseY);
                break;

            default:
                throw new Error('Invalid shape type');
                break;
        }

        shape.draw();
        canvas.setCurrentShape(shape);
        delete(shape);
        canvas.redrawCanvas();
    };

    Controller.prototype.mouseMoveSelect = function(e) {
        /*if (!canvas.isMousePressed) {
            return;
        }*/
        var isMouseIn = false;
        helpers.stopEvent(e);

        canvas.mouseX = parseInt(e.clientX - canvas.offsetX);
        canvas.mouseY = parseInt(e.clientY - canvas.offsetY);


        canvas.getShapesStorage().forEach(function(shape) {
            if (shape.check(canvas.mouseX, canvas.mouseY)) {
                isMouseIn = true;
            }
        });

        document.body.style.cursor = isMouseIn ? 'pointer' : 'default';
    };

    /**
     * Handle mouse moving action while left button pressed.
     * @param e
     */
    Controller.prototype.onMouseMove = function(e) {
        if (canvas.operationMode == 'draw') {
            this.mouseMoveDraw(e);
        } else if (canvas.operationMode == 'select') {
            this.mouseMoveSelect(e);
        }
    };

    /**
     * Handle mouse down action (start of click).
     * @param e
     */
    Controller.prototype.onMouseDown = function(e) {
        helpers.stopEvent(e);
        canvas.startX = parseInt(e.clientX - canvas.offsetX);
        canvas.startY = parseInt(e.clientY - canvas.offsetY);
        canvas.lastX = canvas.startX;
        canvas.lastY = canvas.startY;
        canvas.isMousePressed = true;
    };



    Controller.prototype.onMouseOut = function(e) {
        this.onMouseUp(e);
    };

    /**
     * Handle mouse up action (finish of click).
     * @param e
     */
    Controller.prototype.onMouseUp = function(e) {
        if (!canvas.isMousePressed) {
            return;
        }

        helpers.stopEvent(e);
        canvas.isMousePressed = false;

        if (canvas.operationMode == 'draw') {
            canvas.addShape();
        } else if (canvas.operationMode == 'select') {
            canvas.getShapesStorage().forEach(function(shape) {
                if (shape.check(canvas.mouseX, canvas.mouseY)) {
                    shape.setSelected(true);

                    helpers.log(shape);
                } else {
                    shape.setSelected(false);
                }
            });

            canvas.clearAll();
            canvas.redrawCanvas();
        }
    };

    Controller.prototype.setDrawMode = function(mode) {
        canvas.setDrawMode(mode);
    };

    Controller.prototype.setOperationMode = function(mode) {
        canvas.setOperationMode(mode);

        if (mode == 'draw') {
            canvas.unselectAll();
        }
    };

    Controller.prototype.getShapesStorage = function() {
        return canvas.getShapesStorage();
    };

    Controller.prototype.setShapesStorage = function(shapesArray) {
        canvas.setShapesStorage(shapesArray);
    };

    Controller.prototype.redrawCanvas = function() {
        canvas.redrawCanvas();
    };

    return {
        Controller: Controller
    };
}());