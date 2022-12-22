/**
 * Middleware para controlar los errores.
 * @param {*} error 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: "id used is malformed" }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>
    res.status(401).json({ error: "token missing or invalid" }),

  TokenExpirerError: res =>
    res.status(401).json({ error: "token expired" }),

  defaultError: (res, error) => {
    console.error(error.name);
    res.status(500).end();
  }
};

// eslint-disable-next-line no-unused-vars
module.exports = (error, request, response, next) => {
  console.log(`😱😱 Error ${error.name}`);
  console.error(error);  
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(response, error);
};