const logger = (request, response, next) => {
  console.log(`⚙️ Server running en puerto ${request.method}`);
  console.log(`⚙️ Server running en puerto ${request.path}`);
  console.log(`⚙️ Server running en puerto ${request.body}`);
  next();
};

module.exports = logger;
