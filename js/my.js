/**
 * Created by Dmitrii_Iurev on 14.07.2015.
 */


var helpers =  {
    stopEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
    },

    log: function() {
        if(console){
            console.log.apply(console, arguments);
        }
    },

    array2JSON: function(array) {
        return JSON.stringify(array);
    },

    JSON2Array: function(string) {
        return $.parseJSON(string);
    },

    addEvent: function(elem, type, handler) {
       if (elem.addEventListener) {
           elem.addEventListener(type, handler, false);
       } else {
           elem.attachEvent("on" + type, handler);
       }
    },

    removeEvent: function(elem, type, handler) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handler, false);
            } else {
                elem.detachEvent("on" + type, handler);
            }
    }
};

$(function() {
    var canvas = $('#canvas');
    var canvasObject = document.getElementById('canvas');
    var ctx = canvasObject.getContext("2d");
    var canvasWidth = canvasObject.width;
    var canvasHeight = canvasObject.height;
    var canvasOffset = canvas.offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var isDown = false;
    var startX;
    var startY;
    var lastX;
    var lastY;
    var operationMode = 'draw'; // can be draw, select
    var drawModeShape = 'line';

    var objectsArray = [];
    var currentObject;

    function setDrawMode(mode)
    {
        drawModeShape = mode || 'line';
    }

    function clearCanvas()
    {
        ctx.clearRect(0, 0, canvasObject.width, canvasObject.height);
        objectsArray = [];
        currentObject = {};
    }

    function redrawCanvas()
    {
        objectsArray.forEach(function(item, i) {

            switch (item.type) {

                case 'circle':
                    drawCircle(true, item.x, item.y, item.radius, item.borderStyle, item.lineWidth, item.fillStyle);
                    break;

                case 'line':
                    drawLine(true, item.startX, item.startY, item.x, item.y, item.borderStyle, item.lineWidth, item.fillStyle);
                    break;

                default:
                    throw new Error('Invalid shape type');
                    break;
            }
        });
    }

    function checkLine(mouseX, mouseY, startX, startY, x, y, borderStyle, lineWidth)
    {
        ctx.strokeStyle = borderStyle || '#000000';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.lineWidth = lineWidth || 2;
        ctx.closePath();
        ctx.stroke();

        if (ctx.isPointInPath(mouseX, mouseY)) {
            helpers.log('yes!');

            return true;
        } else {
            helpers.log('no!');

            return false;
        }
    }

    function drawLine(redraw, startX, startY, x, y, borderStyle, lineWidth, fillStyle)
    {
        if (!redraw) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }

        ctx.strokeStyle = borderStyle || '#000000';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.lineWidth = lineWidth || 2;
        ctx.closePath();
        ctx.stroke();

        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }

        if (!redraw) {
            currentObject = {
                type: 'line',
                startX: startX,
                startY: startY,
                x: x,
                y: y,
                borderStyle: borderStyle,
                lineWidth: lineWidth,
                fillStyle: null
            };
        }
    }

    function checkCircle(mouseX, mouseY, x, y, radius, borderStyle, lineWidth)
    {
        ctx.strokeStyle = borderStyle || '#000000';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.lineWidth = lineWidth || 2;
        ctx.closePath();

        if (ctx.isPointInPath(mouseX, mouseY)) {
            helpers.log('yes!');
            return true;
        }

        helpers.log('no!');
        return false;
    }

    function drawCircle(redraw, x, y, radius, borderStyle, lineWidth, fillStyle)
    {
        if(!redraw) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }

        ctx.strokeStyle = borderStyle || '#000000';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.lineWidth = lineWidth || 2;
        ctx.closePath();
        ctx.stroke();

        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }

        if (!redraw) {
            currentObject = {
                type: 'circle',
                x: x,
                y: y,
                radius: radius,
                borderStyle: borderStyle,
                lineWidth: lineWidth,
                fillStyle: null
            };
        }
    }

    /*
    function drawEllipse(x, y)
    {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = "#ff0000";
        ctx.beginPath();
        ctx.moveTo(startX, startY + (y - startY) / 2);
        ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
        ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
        ctx.lineWidth = 2;
        ctx.closePath();
        ctx.stroke();
    }
    */

    function handleMouseDown(e)
    {
        helpers.stopEvent(e);
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        lastX = startX;
        lastY = startY;
        isDown = true;
    }

    function handleMouseUp(e) {
        if (!isDown) {
            return;
        }

        helpers.stopEvent(e);
        isDown = false;

        if (currentObject instanceof Object) {
            objectsArray.push(currentObject);
            helpers.log(objectsArray);
        }
    }

    function handleMouseOut(e) {
        handleMouseUp(e);
    }

    function handleMouseMove(e) {
        if (!isDown) {
            return;
        }

        helpers.stopEvent(e);
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        switch (drawModeShape) {

            case 'circle':
                drawCircle(false, startX, startY, (Math.abs(startX - mouseX) + Math.abs(startY - mouseY)) / 2);
                break;

            case 'line':
                drawLine(false, startX, startY, mouseX, mouseY);
                break;

            default:
                throw new Error('Invalid shape type');
                break;
        }

        redrawCanvas();
    }

    function handleMouseMoveSelected(e)
    {
        var isMouseIn = false;

        helpers.stopEvent(e);
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        helpers.log(objectsArray);

        objectsArray.forEach(function(item, i) {
            switch (item.type) {

                case 'circle':
                    if (checkCircle(mouseX, mouseY, item.x, item.y, item.radius, item.borderStyle, item.lineWidth)) {
                        isMouseIn = true;
                    }
                    break;

                case 'line':
                    if (checkLine(mouseX, mouseY, item.startX, item.startY, item.x, item.y, item.borderStyle, item.lineWidth)) {
                        isMouseIn = true;
                    }
                    break;

                default:
                    throw new Error('Invalid shape type');
                    break;
            }
        });

        document.body.style.cursor = isMouseIn ? 'pointer' : 'default';
    }

    function switch2DrawMode()
    {
        canvas.unbind('mousemove mouseup mousedown mouseout');
        init();
    }

    function switch2SelectMode()
    {
        canvas.unbind('mousemove mouseup mousedown mouseout');

        canvas.bind('mousemove', function(e) {
            handleMouseMoveSelected(e);
        });
    }

    function init()
    {
        canvas.bind('mousedown', function(e) {
           handleMouseDown(e);
        });

        canvas.bind('mousemove', function(e) {
            handleMouseMove(e);
        });

        canvas.bind('mouseup', function(e) {
            handleMouseUp(e);
        });

        canvas.bind('mouseout', function(e) {
            handleMouseOut(e);
        });

        var circle1 = new SNOWFLAKE.shapes.Circle.Circle();
        circle1.init(100, 100, 250, 250, '#F0FFAE', 10, '#FF00AA');
        circle1.draw();

        var line1 = new SNOWFLAKE.shapes.Line.Line();
        line1.init(200,200,300,300, '#AEFF00', 3);
        line1.draw();

        var rect1 = new SNOWFLAKE.shapes.Rectangle.Rectangle();
        rect1.init(250,250,350,350, '#000000', 5, '#FF00EE');
        rect1.draw();

        //helpers.log(circle1, line1);
    }

    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */


    /* Code flow goes here. */
    init();

    $('button.btn-draw-mode').on('click', function() {
        switch2DrawMode();
        setDrawMode($(this).attr('data-mode'));
    });

    $('button.btn-save').on('click', function() {
        $('#shapes').val(helpers.array2JSON(objectsArray));
    });

    $('button.btn-load').on('click', function() {
        objectsArray =helpers.JSON2Array($('#shapes').val());
        redrawCanvas();
    });

    $('button.btn-select-mode').on('click', function() {
        switch2SelectMode();
    });

    $('button.btn-clear-all').on('click', function() {
        clearCanvas();
    });

});
