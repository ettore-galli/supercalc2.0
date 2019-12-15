import { Euros } from "./euros";

let e = new Euros("3,14");
console.log(e.getValue());

let eint = new Euros("300");
console.log(eint.getValue());
 
let edec = new Euros(".1234");
console.log(edec.getValue());