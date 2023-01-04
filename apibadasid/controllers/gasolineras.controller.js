//import { PrismaClient } from "@prisma/client"
const { PrismaClient } = require ("@prisma/client"); // Aquí obtenemos la clase PrismaClient
// Aquí creamos una instancia
// Con el parámetro log sacamos por consola cada query. Quitar para producciónn, ya que es más costoso
const prisma = new PrismaClient({log:["query"]})  

// Devolver todas las gasolineras: por comodidad sólo devolvemos 10
const gasolinerasFetcher = async (request, response,next) => {

  try {
    const gasolinerasReturned = await prisma.gasolineras.findMany({
      skip:0,
      take:5
    });
    response.status(200).json(gasolinerasReturned);
  } catch (error) {
    next(error);
  }finally{
    async () => {
      console.log("Desconecto");
      await prisma.$disconnect();
    }
  };
};

// Devolver todas las gasolineras: por comodidad sólo devolvemos 10
const gasolinerasFetcherOptions = async (request, response,next) => {

  try {
    const gasolinerasReturned = await prisma.gasolineras.findMany({
      select:{
        rotulo: true,
        provincia:true,
        municipio:true,
        gasoleo_a:true,
      },
      where:{
        //provincia: "Zaragoza",
        //rotulo: "CEPSA",
        //rotulo: { not: "CEPSA"},
        //rotulo: { in: ["CEPSA", "BP"]},
        //rotulo: { notIn: ["CEPSA", "BP", "REPSOL"]},
        //rotulo: { contains: "CEP"},
        //rotulo: { endsWith: "SOL"},
        //rotulo: { startsWith: "CEP"},
        //gasoleo_a:{ lt: 2.0},
        //gasoleo_a:{ gt: 2.0},
        // Condicionales (por defecto es AND)
        OR:[
          {provincia: "Sevilla"},
          {provincia: { endsWith: "drid"}}
        ],
        // AND:[
        //   {provincia: "La Rioja"},
        //   {rotulo: { endsWith: "SOL"}}
        // ]        
      },
      orderBy:{
        municipio: "asc",
      },
      skip:0,
      take:50
    });
    response.status(200).json(gasolinerasReturned);
  } catch (error) {
    next(error);
  }finally{
    async () => {
      console.log("Desconecto");
      await prisma.$disconnect();
    }
  };
};

// Obtener provincia por Id usando async/await
const specificGasolinerasFetcher = async (request, response,next) => {
  
  const {gasolineraId} = request.params;

  try {
    const gasolineraReturned = await prisma.gasolineras.findUnique({
      where: {
        id: Number(gasolineraId),
      }
    });
    return gasolineraReturned
      ? response.status(200).json(gasolineraReturned)
      : response.status(404).end();
  } catch (error) {
    next(error);
  }

};

// Obtener provincia por Id usando promesas
const specificGasolinerasFetcherByPromesas = (request, response,next) => {
  
  // Ojo, los parámetros siempre son strings
  const {gasolineraId} = request.params;

  prisma.gasolineras.findUnique({
    where: {
      id: Number(gasolineraId),
    },
  }).then((gasolinera) => {
    return gasolinera
      ? response.status(200).json(gasolinera)
      : response.status(404).end();
  }).catch((err) => {next(err);});

};

// Crear una gasolinera, validando que tenemos nombre en los datos
const gasolineraCreator = async (request, response,next) => {
  
  const gasolinera = request.body;

  // Validación del nombre
  if (!gasolinera || !gasolinera.rotulo) {
    return response.status(400).json({
      message: "gasolinera.rotulo is missing"
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

};

// Actualizar precios de gasolineras
const gasolineraPrizesUpdater = async (request, response,next) => {
  const { gasoleo_a, gasolina_95_e5 } = request.body;

  const specificGasolinera = await prisma.gasolineras.findUnique({
    where: {
      id: Number(request.params.gasolineraId),
    },
  });

  // Param validator
  if (!gasoleo_a || !gasolina_95_e5) return response.status(404).json({ message: "Precios no válidos" });
  if (!specificGasolinera) return response.status(404).json({message: "Gasolinera not found"});

  const updateGasolinera = {
    gasoleo_a: typeof gasoleo_a !== "undefined" ? Number(gasoleo_a) : null,
    gasolina_95_e5: typeof gasolina_95_e5 !== "undefined" ? Number(gasolina_95_e5) : null,
  };

  const updatedGasolinera = await  prisma.gasolineras.update({
    where: {
      id: Number(request.params.gasolineraId),
    },
    data: updateGasolinera,
  });

  response.status(200).json({
    message: "Gasolinera Prices updated successfully",
    data: updatedGasolinera,
  });
};


const gasolineraPropsUpdater = async (request, response,next) => {
  const { rotulo, horario, municipio,provincia } = request.body;

  const specificGasolinera = await prisma.gasolineras.findUnique({
    where: {
      id: Number(request.params.gasolineraId),
    },
  });

  if (!specificGasolinera) return response.status(404).json({message: "Gasolinera not found"});

  const updateGasolinera = {
      rotulo: rotulo,
      horario: horario,
      municipio: municipio,
      provincia: provincia,
  };

  const updatedGasolinera = await  prisma.gasolineras.update({
    where: {
      id: Number(request.params.gasolineraId),
    },
    data: updateGasolinera,
  });

  response.status(200).json({
    message: "Gasolinera Prices updated successfully",
    data: updatedGasolinera,
  });
};

// Eliminar gasolinera
const gasolineraDestroyer = async (request, response, next) => {
  // El next tiene que estar entre los parámetros para acceder al middelware
  const {gasolineraId} = request.params;
  try {
    await prisma.gasolineras.delete({
      where: {
        id: Number(gasolineraId),
      },
    });
    response.status(204).end();
  } catch (error) {
    console.log(`😱 Error ${error.name}`);
    console.log(error);
    next(error);
  }
};

const gasolinerasController = {
  gasolinerasFetcher,
  gasolinerasFetcherOptions,
  specificGasolinerasFetcher,
  specificGasolinerasFetcherByPromesas,
  gasolineraCreator,
  gasolineraPrizesUpdater,
  gasolineraPropsUpdater,
  gasolineraDestroyer,
};

module.exports = gasolinerasController;
