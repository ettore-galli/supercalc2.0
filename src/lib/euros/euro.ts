/**
 * 
 */

interface EuroValue {
    value: string,
}

/**
 * Decimali
 * 
 * valore = __sign * (__integer + __fraction / (10 ^ __scale))
 */
class Euro {

    private __SEPARATORS: RegExp = /[.,]/;
    private __DECIMAL_POINT: string = ".";
    private __SCALE: number = 2;
    private __Z = "0000000000";
    private __scale: number;
    private __value: number;

    /**
     * Costruttore
     * @param value 
     */
    constructor(value: string) {
        this.__scale = this.__SCALE;
        let oneSeparatorValue: string = value.replace(this.__SEPARATORS, this.__DECIMAL_POINT);
        let parts = oneSeparatorValue.split(this.__DECIMAL_POINT);

        let sign: number = 1;
        if (oneSeparatorValue[0] === "-") {
            sign = -1;
        }

        if (parts.length < 2) {
            parts.push("0");
        }

        if ((parts[0] === "") || (parts[0] === "-")) {
            parts[0] = "0"
        }

        let decZeroPad: string = String(parts[1] + this.__Z);
        let decZeros = decZeroPad.substring(0, this.__scale);
        let intPart: number = parts[0] ? parseInt(parts[0]) : 0;
        let decPart: number = decZeros ? parseInt(decZeros) : 0;
        this.__value = sign * (Math.abs(intPart) * Math.pow(10, this.__scale) + Math.abs(decPart));

    }

    add(addendum: Euro) {
        this.__value += addendum.__value;
        return this;
    }

    sub(subtrahend: Euro) {
        this.__value -= subtrahend.__value;
        return this;
    }

    divideValueByScale() {
        let d2 = Math.pow(10, 2 * this.__scale);
        let parts = this.divideIntegerByScaleParts(this.__value, 2 * this.__scale);

    }

    mult(factor: Euro) {
        this.__value = this.__value * factor.__value;
        let parts = this.divideIntegerByScaleParts(this.__value, this.__scale);
        this.__value = parseInt(parts.sign + parts.i); // il decimale viene scartato

        return this;
    }

    divideIntegerByScaleParts(n: number, scale: number): { sign: string, i: string, d: string } {
        let sign: string = "";
        let na: string = String(n);
        if (String(n)[0] === "-") {
            sign = "-";
            na = String(n).substring(1, String(n).length);
        }
        let i: string = "";
        let d: string = ";"
        if (na.length > scale) {
            i = na.substring(0, na.length - scale);
            d = na.substring(na.length - scale, na.length);
        } else {
            i = "0";
            let dp: string = this.__Z + na;
            d = dp.substring(dp.length - scale, dp.length);
        }
        if (d.length > this.__scale) {
            d = d.substring(0, this.__scale);
        }
        return {
            sign: sign,
            i: i,
            d: d
        };
    }

    rebuildNumber(parts: { sign: string, i: string, d: string }): string {
        return parts.sign + parts.i + this.__DECIMAL_POINT + parts.d;
    }

    divideIntegerByScale(n: number, scale: number): string {
        let parts: { sign: string, i: string, d: string } = this.divideIntegerByScaleParts(n, scale);
        return this.rebuildNumber(parts);
    }


    getValue(): string {
        return this.divideIntegerByScale(this.__value, this.__scale);
    }



}

export { Euro };