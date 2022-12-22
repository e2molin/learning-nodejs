const {average} = require("../utils/for_testing");

/* Si ponemos describe.skip, se salta el test */
describe("Average",()=>{
  test("of one value is de value itself",()=>{
    expect(average([1])).toBe(1);
  });
  test("of many is calculated correctly",()=>{
    expect(average([1,2,3,4,5,6])).toBe(3.5);
  });
  test("of empty array",()=>{
    expect(average([])).toBe(0);
  });
});
