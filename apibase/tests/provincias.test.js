const mongoose = require("mongoose");

const { serverAPI } = require("../index");

const Provincia = require("../models/Provincia");
const { api, initialProvincias, getAllNamesFromProvincias } = require("./helpers");

beforeEach(async () => {
  await Provincia.deleteMany({}); // Así borra todas las notas de la colección
  const provincia11 = new Provincia(initialProvincias[0]);
  await provincia11.save();
  const provincia12 = new Provincia(initialProvincias[1]);
  await provincia12.save();
});


test("provincias are return as json", async () => {
  await api
    .get("/api/provincias") // Endpoint que consultamos para superar este test
    .expect(200)  // Status que esperamos de vuelta
    .expect("Content-Type", /application\/json/); // Formato esperado
});

test("there are provincias", async () => {
  // Esperamos que hayan dos provincias (teóricas)
  // POAra asegurarnios, a través del hook beforeEach las insertamos antes
  const response = await api.get("/api/provincias"); // Endpoint que consultamos para superar este test
  expect(response.body).toHaveLength(2); 
  // PAra es
});

test("First provincia is Cádiz", async () => {
  // Esperamos que hayan dos provincias (teóricas)
  const response = await api.get("/api/provincias"); // Endpoint que consultamos para superar este test
  expect(response.body[0].nombre).toBe("Cádiz"); // Comprobamos que en realidad sea Cádiz
});

test("One of the provincias is Castelló/Castellón", async () => {
  // Esperamos que hayan dos provincias (teóricas)
  // Para asegurarnios, a través del hook beforeEach las insertamos antes
  const { provinNames } = await getAllNamesFromProvincias();
  expect(provinNames).toContain("Castelló/Castellón");
});

test("Adding a new provincia", async () => {
  const newProvincia = {"provincia_id" : 13, "nombre" : "Ciudad Real", "capital" : "Ciudad Real", "autonomia" : "Castilla-La Mancha", "codine" : "13", "esuniprovincial" : false, "dirrepo" : "CIUDAD_REAL", "histo" : "Ciudad Real", "comautonoma_id" : 8, "matricula" : "CR", "cdu" : "460.287"};
  await api
    .post("/api/provincias")
    .send(newProvincia)
    .expect(201)
    .expect("Content-Type", /application\/json/); // Formato esperado
  // No es lo único que check. Además comprobamos que realmente hayamos metido Ciudad Real
  const { provinNames, response } = await getAllNamesFromProvincias();
  expect(provinNames).toContain(newProvincia.nombre);
  expect(response.body).toHaveLength(initialProvincias.length+1);
});

test("Adding a new provincia without nombre is forbidden", async () => {
  const newProvincia = {"provincia_id" : 13, "capital" : "Ciudad Real", "autonomia" : "Castilla-La Mancha", "codine" : "13", "esuniprovincial" : false, "dirrepo" : "CIUDAD_REAL", "histo" : "Ciudad Real", "comautonoma_id" : 8, "matricula" : "CR", "cdu" : "460.287"};
  await api
    .post("/api/provincias")
    .send(newProvincia)
    .expect(400);
  // Ahra esperamos que la longitud siga siendo la de las notas originales (2)
  const { response } = await getAllNamesFromProvincias(); 
  expect(response.body).toHaveLength(initialProvincias.length);
  
});


// Esto es un hook que se ejecuta al terminar todos los tests. Recibe un callback que se ejecutará después de todos los test
afterAll(() => {
  mongoose.connection.close();
  serverAPI.close();
});

