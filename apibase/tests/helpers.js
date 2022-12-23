const supertest = require("supertest");
const { app } = require("../index");
const User = require("../models/User");
const api = supertest(app); 


const initialProvincias = [
  {"provincia_id" : 11, "nombre" : "Cádiz", "capital" : "Cádiz", "autonomia" : "Andalucía", "codine" : "11", "esuniprovincial" : false, "dirrepo" : "CADIZ", "histo" : "Cádiz", "comautonoma_id" : 1, "matricula" : "CA", "cdu" : "460.355"},
  {"provincia_id" : 12, "nombre" : "Castelló/Castellón", "capital" : "Castelló de la Plana", "autonomia" : "Comunitat Valenciana", "codine" : "12", "esuniprovincial" : false, "dirrepo" : "CASTELLON", "histo" : "Castellón; Castellón de la Plana; Castellón/Castelló", "comautonoma_id" : 10, "matricula" : "CS", "cdu" : "460.311"},
  {"provincia_id" : 14, "nombre" : "Córdoba", "capital" : "Córdoba", "autonomia" : "Andalucía", "codine" : "14", "esuniprovincial" : false, "dirrepo" : "CORDOBA", "histo" : "Córdoba", "comautonoma_id" : 1, "matricula" : "CO", "cdu" : "460.351"},
  {"provincia_id" : 15, "nombre" : "A Coruña", "capital" : "A Coruña", "autonomia" : "Galicia", "codine" : "15", "esuniprovincial" : false, "dirrepo" : "LA_CORUÑA", "histo" : "La Coruña; A Coruña", "comautonoma_id" : 12, "matricula" : "C", "cdu" : "460.111"},
  {"provincia_id" : 16, "nombre" : "Cuenca", "capital" : "Cuenca", "autonomia" : "Castilla-La Mancha", "codine" : "16", "esuniprovincial" : false, "dirrepo" : "CUENCA", "histo" : "Cuenca", "comautonoma_id" : 8, "matricula" : "CU", "cdu" : "460.283"}
];

const getAllNamesFromProvincias = async () => {
  const response = await api.get("/api/provincias"); // Endpoint que consultamos para superar este test
  return {
    provinNames: response.body.map(provincia => provincia.nombre), 
    response
  };
};

const getAllUsers = async() => {
  const usersDB = await User.find({});
  return usersDB.map(user => user.toJSON());
};

module.exports = {api, initialProvincias, getAllNamesFromProvincias, getAllUsers };
