require("dotenv").config(); // Acceso a las variables de entorno
require("./mongo"); // Con esto, al hacer un require ya se conecta a la App

const express = require("express");
const cors = require("cors");
const app = express();
// const logger = require("./middleware/logger.js");
const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");

// Cargamos los controladores de rutas que vamos a usar
const usersRouter = require("./controllers/users");
const provinciasRouter = require("./controllers/provincias");
const loginRouter = require("./controllers/login");

app.use(cors());  // Usamos este middleware para que cualquier origen funcione con nuestra API
app.use(express.json());  // Usamos este middleware para trabajar con ficheros JSON

// Desde aquí podemos servir estáticos como http://localhost:3001/static/develmap.svg 
// Este middleware 👇 sólo se ejecuta desde la ruta /static
app.use("/static",express.static("images")); 

// app.use(logger); // Middleware de prueba para tener un config.

/**
 * ----------------------------------------------------------------------------------------------
 * Declaración de endpoints
 * ----------------------------------------------------------------------------------------------
 */

//API raíz
app.get("/", (request, response) => {
  console.log(`⚙️ Server running en puerto ${request.method}`);
  response.send("<h1>APIBASE está 👍</h1>");
});

// Endpoints mediante Routers
/**
 * Es muy importante el orden secuencial de los middleware
 * Se leen de arriba a abajo
 */

// EndPoints de provincias
app.use("/api/provincias",provinciasRouter);

// EndPoints de usuarios
app.use("/api/users",usersRouter);

// Endpoint de Login
app.use("/api/login", loginRouter);



//  Middleware para controlar el notFoundPage enviando un 404.
app.use(notFound);
//  Middleware para controlar los errores.
app.use(handleErrors);

const PORT = process.env.PORT || 3001; // Esto lo necesitan deployers como heroku.

const serverAPI = app.listen(PORT, () => {
  // Es más correcto usar esto porque el método listen es asíncrono y puede haber una pequeña latencia.
  console.log(`Server running en puerto ${PORT}`);
});


module.exports = { app,serverAPI };
