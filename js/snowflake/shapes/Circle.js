/**
 * Class implements circle functionality
 * @type {{AbstractShape}}
 */
SNOWFLAKE.shapes.Circle = (function () {
    var AbstractShape = SNOWFLAKE.shapes.AbstractShape.AbstractShape;
    var canvas = SNOWFLAKE.canvas.Context.getInstance();

    function Circle() {
        AbstractShape.apply(this, arguments);
        this.type = 'Circle';
    }

    Circle.prototype = Object.create(AbstractShape.prototype);

    Circle.prototype.init = function(a, b, x, y, borderStyle, lineWidth, fillStyle) {
        this._a = a;
        this._b = b;
        this._x = x;
        this._y = y;
        this._borderStyle = borderStyle || '#000000';
        this._lineWidth = lineWidth || 2;
        this._fillStyle = fillStyle;
    };

    Circle.prototype.check = function(x, y) {
        canvas.setStrokeStyle(this._borderStyle);
        canvas.setLineWidth(this._lineWidth);
        canvas.beginPath();
        canvas.arc(this._a, this._b, (Math.abs(this._a - this._x) + Math.abs(this._b - this._y)) / 2, 0, Math.PI * 2, true);
        canvas.closePath();

        return canvas.isPointInPath(x, y);
    };

    Circle.prototype.drawSelectFrame = function() {
        canvas.setStrokeStyle('cyan');
        canvas.setLineWidth(this._lineWidth);
        canvas.beginPath();
        canvas.arc(this._a, this._b, (Math.abs(this._a - this._x) + Math.abs(this._b - this._y) + 8) / 2, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.stroke();
    };

    Circle.prototype.draw = function() {
        canvas.setStrokeStyle(this._borderStyle);
        canvas.setLineWidth(this._lineWidth);
        canvas.beginPath();
        canvas.arc(this._a, this._b, (Math.abs(this._a - this._x) + Math.abs(this._b - this._y)) / 2, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.stroke();

        if (this._fillStyle) {
            canvas.setFillStyle(this._fillStyle);
            canvas.fill();
        }
    };

    return {
        Circle: Circle
    };
}());