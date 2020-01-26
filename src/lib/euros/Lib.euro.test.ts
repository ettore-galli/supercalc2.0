import { Euro } from './euro';

test('Input and parse', () => {

   let test_cases = [
      ["123.456", "123.45"],
      ["0.123456", "0.12"],
      ["123456", "123456.00"],
      ["123456.00", "123456.00"],
      [".123456", "0.12"],
      ["-123.456", "-123.45"],
      ["-0.123456", "-0.12"],
      ["-123456", "-123456.00"],
      ["-.23456", "-0.23"]
   ]

   console.log("TEST ZERO");
   for (let tc of test_cases) {
      let eu: Euro = new Euro(tc[0]);
      expect(eu.getValue()).toBe(tc[1]);
   }
});

test('Add', () => {

   let test_cases = [
      ["2", "3", "5.00"],
      [".2", ".3", "0.50"],
      [".12", ".34", "0.46"],
      ["123.45", "678.90", "802.35"]

   ];

   console.log("TEST ADD");
   for (let tc of test_cases) {
      let eu_1: Euro = new Euro(tc[0]);
      let eu_2: Euro = new Euro(tc[1]);
      expect(eu_1.add(eu_2).getValue()).toBe(tc[2]);
   }
});


test('Sub', () => {

   let test_cases = [
      ["2", "3", "-1.00"],
      [".2", ".3", "-0.10"],
      [".12", ".34", "-0.22"],
      ["678.90", "123.45", "555.45"]

   ];

   console.log("TEST ADD");
   for (let tc of test_cases) {
      let eu_1: Euro = new Euro(tc[0]);
      let eu_2: Euro = new Euro(tc[1]);
      expect(eu_1.sub(eu_2).getValue()).toBe(tc[2]);
   }
});

test('Mult', () => {

   let test_cases = [
      ["2", "3", "6.00"],
      [".2", ".3", "0.06"],
      [".12", ".34", "0.04"],
      ["123.45", "678.90", "83810.20"]

   ];

   console.log("TEST MULT");
   for (let tc of test_cases) {
      let eu_1: Euro = new Euro(tc[0]);
      let eu_2: Euro = new Euro(tc[1]);
      expect(eu_1.mult(eu_2).getValue()).toBe(tc[2]);
   }
});

