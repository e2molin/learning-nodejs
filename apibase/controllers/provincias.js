const provinciasRouter = require("express").Router();
const Provincia = require("../models/Provincia");
const User = require("../models/User");


// Obtener todas las provincias - Mediante async-await
// Aquí es mejor hacerlo así, proque no manejamos ningún error
// Es una simple refactorización que no mejora el rendimiento, simplemente simplifica el código
provinciasRouter.get("/", async (request, response) => {
  const provincias = await Provincia.find({}).populate("userId",{
    username:1,
    name:1,
  });
  response.status(200).json(provincias);
});


// Obtener todas las provincias - Mediante promesas - Ejemplo educativo 🎓
provinciasRouter.get("/getbypromesas", async (request,response) => {
  Provincia.find({}).then((provincias) =>{
    response.status(200).json(provincias);
  });
});

// Obtener provincia por Id
provinciasRouter.get("/:id", (request, response,next) => {
  //const id = Number(request.params.id); // Ojo, los parámetros siempre son strings
  const {id} = request.params;

  Provincia.findById(id).then((provincia) => {
    return provincia
      ? response.status(200).json(provincia)
      : response.status(404).end();
  }).catch((err) => {next(err);});

});

// Editar Provincia
provinciasRouter.put("/:id", (request, response, next) => {
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
// app.delete("/api/provincias/:id", (request, response, next) => {
//   // El next tiene que estar entre los parámetros para acceder al middelware
//   const {id} = request.params;
//   Provincia.findByIdAndRemove(id)
//     .then(() =>{response.status(204).end();})
//     .catch((error)=>{next(error);});
// });

// Eliminar Provincia
provinciasRouter.delete("/:id", async (request, response, next) => {
  // El next tiene que estar entre los parámetros para acceder al middelware
  const {id} = request.params;
  try {
    await Provincia.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    console.log(`😱 Error ${error.name}`);
    console.log(error);
    next(error);
  }
});

// Dar de alta Provincia mediante promesas - Ejemplo educativo 🎓
provinciasRouter.post("/postbypromesas", (request, response,next) => {
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


// Dar de alta Provincia mediante async-await
provinciasRouter.post("/", async (request, response,next) => {
  const provincia = request.body;

  console.log(`🚦 UserId: ${provincia.userId}`);

  const userCreatingProvincia = await User.findById(provincia.userId);
  
  console.log(userCreatingProvincia);

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
    cdu: provincia.cdu,
    userId: userCreatingProvincia._id,
  });

  try {
    const savedProvincia = await newProvincia.save();
    userCreatingProvincia.provincias = userCreatingProvincia.provincias.concat(savedProvincia._id);
    await userCreatingProvincia.save();
    response.status(201).json(savedProvincia);
  } catch (error) {
    next(error);
  }

});

module.exports = provinciasRouter;