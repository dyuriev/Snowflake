/**
 * Abstract Shape
 * @type {{AbstractShape}}
 */
SNOWFLAKE.shapes.AbstractShape = (function () {

    function AbstractShape() {
        this._isSelected = false;
        this.type = 'AbstractShape';
    }

    AbstractShape.prototype.isSelected = function() {
        return this._isSelected;
    };

    AbstractShape.prototype.setSelected = function(selected) {
        this._isSelected = selected;

    };

    return {
        AbstractShape: AbstractShape
    };
}());
