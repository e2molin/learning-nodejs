require("dotenv").config(); // Acceso a las variables de entorno
require("./mongo"); // Con esto, al hacer un require ya se conecta a la App

const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./middleware/logger.js");

// Cargamos modelos que vamos a usar
const Provincia = require("./models/provincia");
let provincias = [];

app.use(cors());  // Usamos este middleware para que cualquier origen funcione con nuestra API
app.use(express.json());  // Usamos este middleware para trabajar con ficheros JSON
app.use(logger); // Middleware de prueba para tener un config.

app.get("/", (request, response) => {
  console.log(`⚙️ Server running en puerto ${request.method}`);
  response.send("<h1>APIBASE está OK</h1>");
});

app.get("/api/provincias", (request, response) => {
  Provincia.find({}).then((provincias) =>{
    response.status(200).json(provincias);
  });
});

app.get("/api/provincias/:id", (request, response,next) => {
  //const id = Number(request.params.id); //Ojo, los parámetros siempre son strings

  const {id} = request.params;

  Provincia.findById(id).then((provincia)=>{
    if (provincia) {
      response.status(200).json(provincia);
    } else {
      response.status(404).end();
    }
  }).catch((err)=>{
    next(err);
  });

});

app.delete("/api/provincias/:id", (request, response) => {
  const id = Number(request.params.id);
  provincias = provincias.filter(provincia => provincia.id !== id);
  response.status(204).end();
});

app.post("/api/provincias", (request, response) => {
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
  }).catch((err)=>{
    console.log(`⚙️ Ruta no controlada ${err}`);
    response.status(400).json({
      error: err
    });
  });
  


  //response.status(201).json(newProvincia); // La respuesta es la nueva nota
});

// Si la ruta no la tenemos controlado, devolvemos un 404
app.use((request, response) => {
  console.log(`⚙️ Ruta no controlada ${request.path}`);
  response.status(404).json({
    error: "Ruta no válida"
  });
});

//  Middleware para controlar los errores.
app.use((error,request,response,next)=>{
  console.log(`😱 Error ${error.name}`);
  console.error(error);
  if (error.name==="CastError"){
    // Se produce cuando por ejemplo pedimos un id que no tiene el tamaño adecuado, 24 caracteres hexadecimales.
    response.status(400).send({error:"Bad Id. Mandatory 24 hexadecimal char or integer"});  
  }else{
    response.status(500).end();  
  }
  
});


const PORT = process.env.PORT || 3001; // Esto lo necesitan deployers como heroku.

app.listen(PORT, () => {
  // Es más correcto usar esto porque el método listen es asíncrono y puede haber una pequeña latencia.
  console.log(`Server running en puerto ${PORT}`);
});
