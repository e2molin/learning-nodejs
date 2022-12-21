const {average} = require("../utils/for_testing");

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
