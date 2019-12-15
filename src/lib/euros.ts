/**
 * 
 */

interface EurosValue {
    euros: number,
    cents: number
}

class Euros {
    private __integer: number; // int
    private __fraction: number; // int
    private __scale: number = 100;
    private __SEPARATORS: RegExp = /[.,]/;
    private __DECIMAL_POINT: string = ".";

    constructor(value: string) {
        let oneSeparatorValue: string = value.replace(this.__SEPARATORS, this.__DECIMAL_POINT);
        let parts = oneSeparatorValue.split(this.__DECIMAL_POINT);
        this.__integer = parts[0] ? parseInt(parts[0]) : 0;
        this.__fraction = parts[1] ? parseInt(parts[1]) : 0;


    }

    getValue(): EurosValue {
        return {
            euros: this.__integer,
            cents: this.__fraction
        };
    }
}

export { Euros };