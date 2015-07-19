/**
 * Helpers library
 * @type {{stopEvent, log, array2JSON, JSON2Array, addEvent, removeEvent}}
 */
SNOWFLAKE.Helpers = (function () {

    return {
        log: log,
        array2JSON: array2JSON,
        JSON2Array: JSON2Array,
        addEvent: addEvent,
        removeEvent: removeEvent,
        stopEvent: stopEvent,
        objects2JSON: objects2JSON,
        JSON2Objects: JSON2Objects
    };

    /**
     * Log to console
     */
    function log() {
        if(console) {
            console.log.apply(console, arguments);
        }
    }

    /**
     * Converts array to JSON
     * @param array
     */
    function array2JSON(array) {
        return JSON.stringify(array);
    }

    /**
     * Converts JSON to array
     * @param string
     */
    function JSON2Array(string) {
        return JSON.parse(string);
    }

    function objects2JSON(objectsArray)
    {
        var tmpArray = [];

        objectsArray.forEach(function(object) {
            tmpArray.push(JSON.stringify(object))
        });

        return array2JSON(tmpArray);
    }

    function JSON2Objects(string)
    {
        var tmpArray = JSON2Array(string);
        var objectsArray = [];

        tmpArray.forEach(function(item) {
            objectsArray.push(JSON.parse(item));
        });

        return objectsArray;
    }

    /**
     * Adds event handler to DOM object
     * @param elem
     * @param type
     * @param handler
     */
    function addEvent(elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else {
            elem.attachEvent("on" + type, handler);
        }
    }

    /**
     * Remove event handler
     * @param elem
     * @param type
     * @param handler
     */
    function removeEvent(elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else {
            elem.detachEvent("on" + type, handler);
        }
    }

    /**
     * Stops event and prevent propagation
     * @param e
     */
    function stopEvent(e) {
        e.preventDefault();
        e.stopPropagation();
    }

}());