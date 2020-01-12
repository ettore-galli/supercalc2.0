import { Euros } from './euros';

test('Basic Usage / Happy path', () => {

   let eu = new Euros("3.14");
   expect(eu.getValue()).toStrictEqual({ integer: 3, fraction: 140000000, scale: 9, sign: 1 });


});

test('Basic Usage / A lot of decimals', () => {

   let eu = new Euros("3.1415927");
   expect(eu.getValue()).toStrictEqual({ integer: 3, fraction: 141592700, scale: 9, sign: 1 });


});

test('Basic Usage / add', () => {
   let test_cases = [
      ["123.0", "123.0", { integer: 246, fraction: 0, scale: 9, sign: 1 }],
      ["1.01", "2.02", { integer: 3, fraction: 30000000, scale: 9, sign: 1 }],
      ["12345678.987654321", "87654321.012345678", { integer: 99999999, fraction: 999999999, scale: 9, sign: 1 }],
      ["0.3", "0.6", { integer: 0, fraction: 900000000, scale: 9, sign: 1 }],
      ["0.03", "0.05", { integer: 0, fraction: 80000000, scale: 9, sign: 1 }],
      ["1.49", "1.52", { integer: 3, fraction: 10000000, scale: 9, sign: 1 }],
      ["4.00", "-1.98", { integer: 2, fraction: 20000000, scale: 9, sign: 1 }]
   ]
   for (let tc of test_cases) {
      let eu1 = new Euros(tc[0] as string);
      let eu2 = new Euros(tc[1] as string);
      eu1.add(eu2);
      expect(eu1.getValue()).toStrictEqual(tc[2]);
   }
});

test('Basic Usage / sub', () => {
   let test_cases = [
      ["4.00", "1.98", { integer: 2, fraction: 20000000, scale: 9, sign: 1 }],
      ["3.01", "1.02", { integer: 1, fraction: 990000000, scale: 9, sign: 1 }],
      ["-5", "1", { integer: 6, fraction: 0, scale: 9, sign: -1 }],
      ["-.5", ".2", { integer: 0, fraction: 700000000, scale: 9, sign: -1 }]

   ]
   for (let tc of test_cases) {
      console.log("TEST SUB:", tc);
      let eu1 = new Euros(tc[0] as string);
      let eu2 = new Euros(tc[1] as string);
      eu1.sub(eu2);
      expect(eu1.getValue()).toStrictEqual(tc[2]);
   }

});


test('Basic Usage / mult', () => {
   let test_cases = [
      //["4.01", "7.00", { integer: 28, fraction: 70000000, scale: 9, sign: 1 }],
      ["123.456", "789.012", { integer: 97408, fraction: 265472000, scale: 9, sign: 1 }]

   ]
   for (let tc of test_cases) {
      console.log("TEST MULT:", tc);
      let eu1 = new Euros(tc[0] as string);
      let eu2 = new Euros(tc[1] as string);
      eu1.mult(eu2);
      expect(eu1.getValue()).toStrictEqual(tc[2]);
   }

});
