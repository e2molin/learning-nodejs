require("dotenv").config();
//require("./postgresByPrisma"); // Con esto, al hacer un require ya se conecta a la App
const express = require("express");
const cors = require("cors");
const app = express();

// Cargamos los controladores de rutas que vamos a usar
const gasolinerasRouter = require("./controllers/gasolineras");


// Importamos middlewares
const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");


app.use(cors());  // Usamos este middleware para que cualquier origen funcione con nuestra API
app.use(express.json());  // Usamos este middleware para trabajar con ficheros JSON

// Desde aquí podemos servir estáticos como http://localhost:3001/static/develmap.svg 
// Este middleware 👇 sólo se ejecuta desde la ruta /static
app.use("/static",express.static("images")); 


//API raíz
app.get("/", (request, response) => {
  console.log(`⚙️ Server running en puerto ${request.method}`);
  response.send("<h1>APIBASE está 👍</h1>");
});

// EndPoints de provincias
app.use("/gasolineras",gasolinerasRouter);


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
