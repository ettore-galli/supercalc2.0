import { Euros } from './euros';

test('Basic Usage / Happy path', () => {

   let eu = new Euros("3.14");
   expect(eu.getValue()).toStrictEqual({ euros: 3, cents: 14 });


});

