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

  SequelizeDatabaseError: (res, { message }) =>
    res.status(409).json({ error: message }),
  
  SequelizeForeignKeyConstraintError: (res, { message }) =>
    res.status(409).json({ error: message }),

  defaultError: (res, error) => {
    console.error(error.name);
    res.status(500).end();
  }
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, request, response, next) => {
  console.log(`😱😱🔫 Error ${error.name}`);
  console.error(error.message);  
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(response, error);
};