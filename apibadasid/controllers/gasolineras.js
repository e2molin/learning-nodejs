const gasolinerasRouter = require("express").Router();
//const prisma = require("../postgresByPrisma");
//import { PrismaClient } from "@prisma/client"
const { PrismaClient } = require ("@prisma/client"); // Aquí obtenemos la clase PrismaClient
const prisma = new PrismaClient() // Aquí creamos una instancia

// Devolver todas las gasolineras: por comodidad sólo devolvemos 10
gasolinerasRouter.get("/", async (request, response,next) => {

  try {
    const gasolineraReturned = await prisma.gasolineras.findMany({
      skip:0,
      take:10
    });
    response.status(200).json(gasolineraReturned);
  } catch (error) {
    next(error);
  }finally{
    async () => {
      await prisma.$disconnect();
    }
  };
});

// Obtener provincia por Id usando promesas
gasolinerasRouter.get("/bypromesas/:id", (request, response,next) => {
  // Ojo, los parámetros siempre son strings
  const {id} = request.params;

  prisma.gasolineras.findUnique({
    where: {
      id: Number(id),
    },
  }).then((gasolinera) => {
    return gasolinera
      ? response.status(200).json(gasolinera)
      : response.status(404).end();
  }).catch((err) => {next(err);});

});

// Obtener provincia por Id usando funciones Async/Await
gasolinerasRouter.get("/byasync/:id", async (request, response,next) => {
  // Ojo, los parámetros siempre son strings
  const {id} = request.params;

  try {
    const gasolineraReturned = await prisma.gasolineras.findUnique({
      where: {
        id: Number(id),
      }
    });
    return gasolineraReturned
      ? response.status(200).json(gasolineraReturned)
      : response.status(404).end();
  } catch (error) {
    next(error);
  }

});

// Crear una gasolinera, validando que tenemos nombre en los datos
gasolinerasRouter.post("/", async (request, response,next) => {
  
  const gasolinera = request.body;

  // Validación del nombre
  if (!gasolinera || !gasolinera.rotulo) {
    return response.status(400).json({
      error: "gasolinera.rotulo is missing"
    });
  }

  const newGasolinera = {
    ideess: Number(gasolinera.ideess),
    rotulo: gasolinera.rotulo,
    horario: gasolinera.horario,
    municipio: gasolinera.municipio,
    provincia: gasolinera.provincia,
    lat: typeof gasolinera.lat !== "undefined" ? Number(gasolinera.lat) : null,
    lon: typeof gasolinera.lon !== "undefined" ? Number(gasolinera.lon) : null,
    gasoleo_a: typeof gasolinera.gasoleo_a !== "undefined" ? Number(gasolinera.gasoleo_a) : null,
    gasolina_95_e5: typeof gasolinera.gasolina_95_e5 !== "undefined" ? Number(gasolinera.gasolina_95_e5) : null,
  };

  try {
    const gasolineraReturned = await prisma.gasolineras.create({
      data: newGasolinera,
    });
    response.status(201).json(gasolineraReturned);
  } catch (error) {
    next(error);
  }

});

// Eliminar Provincia
gasolinerasRouter.delete("/:id", async (request, response, next) => {
  // El next tiene que estar entre los parámetros para acceder al middelware
  const {id} = request.params;
  try {
    await prisma.gasolineras.delete({
      where: {
        id: Number(id),
      },
    });
    response.status(204).end();
  } catch (error) {
    console.log(`😱 Error ${error.name}`);
    console.log(error);
    next(error);
  }
});


module.exports = gasolinerasRouter;