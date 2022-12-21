const suma = (a,b) => {
  return a-b;
};

const checkList = [
  {a:1,b:3,result:4},
  {a:0,b:0,result:0},
  {a:-2,b:5,result:3}
];

checkList.forEach(check=>{
  const {a,b,result}= check;
  console.assert(
    suma (a,b) === result,
    `Test fail: ${a} + ${b} expected to be ${result}`
  );
});

