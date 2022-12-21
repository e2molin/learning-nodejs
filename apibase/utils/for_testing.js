const palindrome = (string) => {

  if (typeof string === "undefined") return; // Si recibimos undefined, devolvemos undefined

  return string
    .split("")
    .reverse()
    .join("");
};

const average = array =>{
  let sum = 0;
  array.forEach(element => {sum+=element;});
  return sum/array.length;
};

module.exports = {
  palindrome,
  average,
};
