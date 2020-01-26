"use strict";
exports.__esModule = true;
var euros_1 = require("./euros");
var e = new euros_1.Euros("3,14");
console.log(e.getValue());
var eint = new euros_1.Euros("300");
console.log(eint.getValue());
var edec = new euros_1.Euros(".1234");
console.log(edec.getValue());
