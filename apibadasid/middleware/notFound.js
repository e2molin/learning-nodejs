/**
 * Middleware para controlar el notFoundPage enviando un 404 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */

module.exports = (request, response) =>{
  console.log(`⚙️ Ruta no controlada ${request.path}`);
  response.status(404).end();
};
