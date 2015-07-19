/**
 * Class implements Line functionality
 * @type {{AbstractShape}}
 */
SNOWFLAKE.shapes.Line = (function () {
    var AbstractShape = SNOWFLAKE.shapes.AbstractShape.AbstractShape;
    var canvas = SNOWFLAKE.canvas.Context.getInstance();

    function Line() {
        AbstractShape.apply(this, arguments);
        this.type = 'Line';
    }

    Line.prototype = Object.create(AbstractShape.prototype);

    Line.prototype.init = function(a, b, x, y, borderStyle, lineWidth) {
        this._a = a;
        this._b = b;
        this._x = x;
        this._y = y;
        this._borderStyle = borderStyle || '#000000';
        this._lineWidth = lineWidth || 2;
    };

    Line.prototype.check = function() {
        console.log('no :(');
        return false;
    };

    Line.prototype.draw = function() {
        canvas.setStrokeStyle(this._borderStyle);
        canvas.setLineWidth(this._lineWidth);
        canvas.beginPath();
        canvas.line(this._a, this._b, this._x, this._y);
        canvas.closePath();
        canvas.stroke();
    };

    return {
        Line: Line
    };
}());