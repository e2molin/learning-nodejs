const {palindrome} = require("../utils/for_testing");

test("palindromo de esteban",()=>{
  const result = palindrome("esteban");
  expect(result).toBe("nabetse");
});

test("palindromo de cadena vacía",()=>{
  const result = palindrome("");
  expect(result).toBe("");
});

test("palindromo de undefined",()=>{
  const result = palindrome();
  expect(result).toBeUndefined();
});