/**
 * SnowFlake - JavaScript vector editor
 * @version 0.1
 * @author Dmitrii Iurev
 */

var SNOWFLAKE = SNOWFLAKE || {};

SNOWFLAKE.namespace = function (string) {
    var parts = string.split('.'),
    parent = SNOWFLAKE, i;

    if (parts[0] === 'SNOWFLAKE') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

SNOWFLAKE.namespace('SNOWFLAKE.helpers');
SNOWFLAKE.namespace('SNOWFLAKE.shapes');
SNOWFLAKE.namespace('SNOWFLAKE.canvas');
SNOWFLAKE.namespace('SNOWFLAKE.controller');
