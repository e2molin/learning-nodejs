require("dotenv").config(); // Acceso a las variables de entorno
require("./mongo"); // Con esto, al hacer un require ya se conecta a la App

const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./middleware/logger.js");
const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");

// Cargamos modelos que vamos a usar
const Provincia = require("./models/Provincia");

app.use(cors());  // Usamos este middleware para que cualquier origen funcione con nuestra API
app.use(express.json());  // Usamos este middleware para trabajar con ficheros JSON
// Desde aquí podemos servir estáticos como http://localhost:3001/static/develmap.svg 
// Este middleware 👇 sólo se ejecuta desde la ruta /static
app.use("/static",express.static("images")); 

app.use(logger); // Middleware de prueba para tener un config.

app.get("/", (request, response) => {
  console.log(`⚙️ Server running en puerto ${request.method}`);
  response.send("<h1>APIBASE está OK</h1>");
});

// Obtener todas las provincias
app.get("/api/provincias", (request, response) => {
  Provincia.find({}).then((provincias) =>{
    response.status(200).json(provincias);
  });
});

// Obtener provincia por Id
app.get("/api/provincias/:id", (request, response,next) => {
  //const id = Number(request.params.id); //Ojo, los parámetros siempre son strings

  const {id} = request.params;

  Provincia.findById(id).then((provincia)=>{
    return provincia
      ? response.status(200).json(provincia)
      : response.status(404).end();
  }).catch((err)=>{next(err);});

});

// Eliminar Provincia
app.put("/api/provincias/:id", (request, response, next) => {
  // El next tiene que estar entre los parámetros para acceder al middelware
  const {id} = request.params;
  const provincia = request.body;

  const newProvinciaInfo = {
    provincia_id: Number(provincia.provincia_id),
    nombre: provincia.nombre,
    capital: provincia.capital,
    autonomia: provincia.autonomia,
    fecha: new Date().toISOString(),
    codine: provincia.codine,
    esuniprovincial: typeof provincia.esuniprovincial !== "undefined" ? provincia.esuniprovincial : false,
    dirrepo: provincia.dirrepo,
    histo: provincia.histo,
    comautonoma_id: Number(provincia.comautonoma_id),
    matricula: provincia.matricula,
    cdu: provincia.cdu
  };

  Provincia.findByIdAndUpdate(id,newProvinciaInfo,{new:true}).then((result) =>{
    response.status(200).json(result);
  }).catch((error)=>{
    next(error);
  });

});

// Eliminar Provincia
app.delete("/api/provincias/:id", (request, response, next) => {
  // El next tiene que estar entre los parámetros para acceder al middelware
  const {id} = request.params;
  Provincia.findByIdAndRemove(id)
    .then(() =>{response.status(204).end();})
    .catch((error)=>{next(error);});
});

// Dar de alta Provincia
app.post("/api/provincias", (request, response,next) => {
  const provincia = request.body;

  // Validación del nombre
  if (!provincia || !provincia.nombre) {
    return response.status(400).json({
      error: "provincia.name is missing"
    });
  }

  const newProvincia = new Provincia ({
    provincia_id: Number(provincia.provincia_id),
    nombre: provincia.nombre,
    capital: provincia.capital,
    autonomia: provincia.autonomia,
    fecha: new Date().toISOString(),
    codine: provincia.codine,
    esuniprovincial: typeof provincia.esuniprovincial !== "undefined" ? provincia.esuniprovincial : false,
    dirrepo: provincia.dirrepo,
    histo: provincia.histo,
    comautonoma_id: Number(provincia.comautonoma_id),
    matricula: provincia.matricula,
    cdu: provincia.cdu
  });

  newProvincia.save().then((savedProvincia)=>{
    response.status(201).json(savedProvincia);
  }).catch((error)=>{
    next(error);
  });

});

/**
 * Es muy importante el orden secuencial de los middleware
 * Se leen de arriba a abajo
 */


//  Middleware para controlar el notFoundPage enviando un 404.
app.use(notFound);
//  Middleware para controlar los errores.
app.use(handleErrors);


const PORT = process.env.PORT || 3001; // Esto lo necesitan deployers como heroku.

app.listen(PORT, () => {
  // Es más correcto usar esto porque el método listen es asíncrono y puede haber una pequeña latencia.
  console.log(`Server running en puerto ${PORT}`);
});

