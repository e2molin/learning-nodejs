const mongoose = require("mongoose");

const { serverAPI } = require("../index");

const Provincia = require("../models/Provincia");
const { api, initialProvincias, getAllNamesFromProvincias } = require("./helpers");

beforeEach(async () => {
  await Provincia.deleteMany({}); // Así borra todas las notas de la colección

  // 👎 Esto funcionaría, pero como se hacen en paralelo no tiene por qué hacerse en el orden esperado, y eso es crítico para nuestros test
  /*//🐞
  const provinciasObjects = initialProvincias.map(provincia => new Provincia(provincia));
  const promises = provinciasObjects.map(provincia => provincia.save());
  await Promise.all(promises);
  */
  // 👌 Esto se hace de manera secuencial y es más correcto
  for (const provincia of initialProvincias){
    const provinciaObject = new Provincia(provincia);
    await provinciaObject.save();
  }

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
  expect(response.body).toHaveLength(initialProvincias.length); 
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

test("A province can be deleted", async () => {
  const { response:initialResponse } = await getAllNamesFromProvincias();
  const { body:provincias } = initialResponse;
  const provinToDelete = provincias[0];
  await api
    .delete(`/api/provincias/${provinToDelete.id}`)
    .expect(204);
  const { provinNames, response:afterDeleteResponse } = await getAllNamesFromProvincias(); 
  expect(afterDeleteResponse.body).toHaveLength(initialProvincias.length-1);
  expect(provinNames).not.toContain(provinToDelete.nombre);
});

test("A province can´t be deleted", async () => {
  await api
    .delete("/api/provincias/1212121")
    .expect(400);
  const { response } = await getAllNamesFromProvincias(); 
  expect(response.body).toHaveLength(initialProvincias.length);
});


// Esto es un hook que se ejecuta al terminar todos los tests. Recibe un callback que se ejecutará después de todos los test
afterAll(() => {
  mongoose.connection.close();
  serverAPI.close();
});

