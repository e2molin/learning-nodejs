/**
 * Middleware para controlar los errores.
 * @param {*} error 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
module.exports = (error,request,response) => {
  console.log(`😱 Error ${error.name}`);
  console.error(error);
  if (error.name==="CastError"){
    // Se produce cuando por ejemplo pedimos un id que no tiene el tamaño adecuado, 24 caracteres hexadecimales.
    response.status(400).send({error:"Bad Id. Mandatory 24 hexadecimal char or integer"});  
  }else{
    response.status(500).end();  
  }
};