/**
 * Class implements Rectangle functionality
 * @type {{AbstractShape}}
 */
SNOWFLAKE.shapes.Rectangle = (function () {
    var AbstractShape = SNOWFLAKE.shapes.AbstractShape.AbstractShape;
    var canvas = SNOWFLAKE.canvas.Context.getInstance();

    function Rectangle() {
        AbstractShape.apply(this, arguments);
        this.type = 'Rectangle';
    }

    Rectangle.prototype = Object.create(AbstractShape.prototype);

    Rectangle.prototype.init = function(a, b, x, y, borderStyle, lineWidth, fillStyle) {
        this._a = a;
        this._b = b;
        this._x = x;
        this._y = y;
        this._borderStyle = borderStyle || '#000000';
        this._lineWidth = lineWidth || 2;
        this._fillStyle = fillStyle;
    };

    Rectangle.prototype.check = function(x, y) {
        canvas.setStrokeStyle(this._borderStyle);
        canvas.setLineWidth(this._lineWidth);
        canvas.beginPath();
        canvas.rect(this._a, this._b, this._x - this._a, this._y - this._b);
        canvas.closePath();

        return canvas.isPointInPath(x, y);
    };

    Rectangle.prototype.drawSelectFrame = function() {
        canvas.setStrokeStyle('cyan');
        canvas.setLineWidth(this._lineWidth + 2);
        canvas.beginPath();
        canvas.rect(this._a - 2, this._b - 2, (this._x - this._a) + 4, (this._y - this._b) + 6);
        canvas.closePath();
        canvas.stroke();
    };

    Rectangle.prototype.draw = function() {
        canvas.setStrokeStyle(this._borderStyle);
        canvas.setLineWidth(this._lineWidth);
        canvas.beginPath();
        canvas.rect(this._a, this._b, this._x - this._a, this._y - this._b);
        canvas.closePath();
        canvas.stroke();

        if (this._fillStyle) {
            canvas.setFillStyle(this._fillStyle);
            canvas.fill();
        }

    };

    return {
        Rectangle: Rectangle
    };
}());