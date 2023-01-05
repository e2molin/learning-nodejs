// Devolver todas las gasolineras: por comodidad sólo devolvemos 10
export const projectsFetcher = async (request, response,next) => {

  
  response.status(200).json("Getting Proyects");
  // try {
  //   const gasolinerasReturned = await prisma.gasolineras.findMany({
  //     skip:0,
  //     take:5
  //   });
  //   response.status(200).json(gasolinerasReturned);
  // } catch (error) {
  //   next(error);
  // }finally{
  //   async () => {
  //     console.log("Desconecto");
  //     await prisma.$disconnect();
  //   }
  // };
};
