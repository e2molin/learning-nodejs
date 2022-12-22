const supertest = require("supertest");
const { app } = require("../index");
const api = supertest(app); 
const initialProvincias = [
  {"provincia_id" : 11, "nombre" : "Cádiz", "capital" : "Cádiz", "autonomia" : "Andalucía", "codine" : "11", "esuniprovincial" : false, "dirrepo" : "CADIZ", "histo" : "Cádiz", "comautonoma_id" : 1, "matricula" : "CA", "cdu" : "460.355"},
  {"provincia_id" : 12, "nombre" : "Castelló/Castellón", "capital" : "Castelló de la Plana", "autonomia" : "Comunitat Valenciana", "codine" : "12", "esuniprovincial" : false, "dirrepo" : "CASTELLON", "histo" : "Castellón; Castellón de la Plana; Castellón/Castelló", "comautonoma_id" : 10, "matricula" : "CS", "cdu" : "460.311"}
];

const getAllNamesFromProvincias = async () => {
  const response = await api.get("/api/provincias"); // Endpoint que consultamos para superar este test
  return {
    provinNames: response.body.map(provincia => provincia.nombre), 
    response
  };
};

module.exports = {api, initialProvincias, getAllNamesFromProvincias };
