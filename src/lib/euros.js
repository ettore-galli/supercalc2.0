"use strict";
/**
 *
 */
exports.__esModule = true;
var Euros = /** @class */ (function () {
    function Euros(value) {
        this.__scale = 100;
        this.__SEPARATORS = /[.,]/;
        this.__DECIMAL_POINT = ".";
        var oneSeparatorValue = value.replace(this.__SEPARATORS, this.__DECIMAL_POINT);
        var parts = oneSeparatorValue.split(this.__DECIMAL_POINT);
        this.__integer = parts[0] ? parseInt(parts[0]) : 0;
        this.__fraction = parts[1] ? parseInt(parts[1]) : 0;
    }
    Euros.prototype.getValue = function () {
        return {
            euros: this.__integer,
            cents: this.__fraction
        };
    };
    return Euros;
}());
exports.Euros = Euros;
