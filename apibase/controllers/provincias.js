const provinciasRouter = require("express").Router();
const Provincia = require("../models/Provincia");


provinciasRouter.get("/bypromesas", async (request,response) => {

  Provincia.find({}).then((provincias) =>{
    response.status(200).json(provincias);
  });

});



module.exports = provinciasRouter;