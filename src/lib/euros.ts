/**
 * 
 */

interface EurosValue {
    integer: number,
    fraction: number,
    scale: number,
    sign: number
}

/**
 * Decimali
 * 
 * valore = __sign * (__integer + __fraction / (10 ^ __scale))
 */
class Euros {

    private __SEPARATORS: RegExp = /[.,]/;
    private __DECIMAL_POINT: string = ".";
    private __SCALE: number = 9;
    private __sign: number; // +1 / -1
    private __integer: number;
    private __fraction: number;
    private __scale: number;
    private __SCALEMISMATCHERROR: number = 10001;

    /**
     * Costruttore
     * @param value 
     */
    constructor(value: string) {
        this.__scale = this.__SCALE;
        let oneSeparatorValue: string = value.replace(this.__SEPARATORS, this.__DECIMAL_POINT);
        let parts = oneSeparatorValue.split(this.__DECIMAL_POINT);


        if (parts[0] === "") {
            parts[0] = "0"
            this.__integer = 0;
            this.__sign = 1;
        }
        else if (parts[0] === "-") {
            parts[0] = "-0"
            this.__integer = 0;
            this.__sign = -1;
        }
        else {
            let intPart: number = parts[0] ? parseInt(parts[0]) : 0;
            this.__sign = intPart < 0 ? -1 : 1;
            this.__integer = Math.abs(intPart);
        }

        if (parts.length < 2) {
            parts.push("0");
        }
        this.__fraction = parts[1] ? parseInt(parts[1]) : 0;

        let padExp = this.__scale - parts[1].length;
        if (padExp > 0) {
            this.__fraction = this.__fraction * Math.pow(10, padExp)
        }
    }

    parseFromString(value: string) {

    }

    getValue(): EurosValue {
        return {
            integer: this.__integer,
            fraction: this.__fraction,
            scale: this.__scale,
            sign: this.__sign
        };
    }

    isPositive() {
        return this.__sign > 0;
    }

    getInteger(): number {
        return this.__integer;
    }

    getFraction(): number {
        return this.__fraction;
    }

    getScale(): number {
        return this.__scale;
    }

    toString(): string {
        return this.__integer + this.__DECIMAL_POINT + this.__fraction;
    }

    minus(): Euros {
        this.__sign = - this.__sign;
        return this;
    }
    add(addendum: Euros): Euros {
        if (this.isPositive() && addendum.isPositive()) {
            return this.__executeAdd(addendum);
        }
        else if (!this.isPositive() && !addendum.isPositive()) {
            return this.minus().__executeAdd(addendum).minus();
        }
        else if (this.isPositive() && !addendum.isPositive()) {
            return this.__executeSub(addendum.minus());
        }
        else { // (!this.isPositive() && addendum.isPositive())
            return this.minus().__executeSub(addendum).minus();
        }
    }
    __executeAdd(addendum: Euros): Euros {
        if (this.__scale !== addendum.__scale) {
            throw new Error(this.__SCALEMISMATCHERROR.toString());
        }
        let commonScale = this.__scale;
        let f: number = this.__fraction + addendum.getFraction();
        this.__fraction = f % Math.pow(10, commonScale);
        this.__integer = this.__integer + addendum.getInteger() + Math.floor(f / Math.pow(10, commonScale));
        return this;
    }

    sub(subtrahend: Euros): Euros {
        return this.add(subtrahend.minus())
    }
    __executeSub(subtrahend: Euros): Euros {
        let delta_fractions = this.__fraction - subtrahend.__fraction;
        let borrow = 0;
        if (delta_fractions < 0) {
            borrow = 1;
            delta_fractions = Math.pow(10, this.__scale) + delta_fractions;
        }
        this.__fraction = delta_fractions;
        this.__integer = this.__integer - subtrahend.__integer - borrow;
        return this;
    }

    getErrorMessage(code: number) {
        return "Error" + code.toString();
    }

    mult(multiplier: Euros): Euros {
        this.__sign = this.__sign * multiplier.__sign;

        let k1 = this.__integer * multiplier.__integer;
        let k2 = this.__integer * multiplier.__fraction;
        let k3 = this.__fraction * multiplier.__integer;
        let k4 = this.__fraction * multiplier.__fraction;

        let s1 = k1 + Math.floor(k2 / Math.pow(10, this.__scale)) +
            Math.floor(k3 / Math.pow(10, this.__scale)) +
            Math.floor(k4 / Math.pow(10, 2 * this.__scale))
            ;


        let s2 = k2 % Math.pow(10, this.__scale) +
            k3 % Math.pow(10, this.__scale) +
            Math.floor(k4 % Math.pow(10, 2 * this.__scale) / Math.pow(10, this.__scale));
        ;

        this.__fraction = s2 % Math.pow(10, this.__scale);
        this.__integer = s1 + Math.floor(s2 / Math.pow(10, this.__scale));

        return this;
    }



}

export { Euros };