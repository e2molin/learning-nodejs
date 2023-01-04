const gasolinerasRouter = require("express").Router();
const gasolinerasController = require("../controllers/gasolineras.controller");

// get all gasolineras
gasolinerasRouter.get("/", gasolinerasController.gasolinerasFetcher);

gasolinerasRouter.get("/withoptions", gasolinerasController.gasolinerasFetcherOptions);


// get specific gasolinera
gasolinerasRouter.get("/:gasolineraId", gasolinerasController.specificGasolinerasFetcher);

// get specific gasolinera by promesas
gasolinerasRouter.get("/bypromesas/:gasolineraId", gasolinerasController.specificGasolinerasFetcherByPromesas);

// create new gasolinera
gasolinerasRouter.post("/", gasolinerasController.gasolineraCreator);

// update precios gasolinera
gasolinerasRouter.put("/actualizaprecios/:gasolineraId", gasolinerasController.gasolineraPrizesUpdater);

// update datos gasolinera
gasolinerasRouter.put("/actualizaprops/:gasolineraId", gasolinerasController.gasolineraPropsUpdater);

// delete gasolinera
gasolinerasRouter.delete("/:gasolineraId", gasolinerasController.gasolineraDestroyer);

module.exports = gasolinerasRouter;