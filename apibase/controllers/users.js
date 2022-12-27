// Importamos una clase que nos permite crear un Router de forma separada a lo que tendemo definido en el index.js
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");


usersRouter.get("/", async (request,response) => {
  // Así devolvemos sólo Usuarios
  // const users = await User.find({}) 
  // Así devolvemos Usuarios relacionados con provincias
  // Ojo, esto no es transaccional, como en las db relacionales. las tablas no están bloqueadas durante la consulta
  const users = await User.find({}).populate("provincias",{
    //Por defecto añade todas las propiedades, pero podemos limitar los campos que se devuelven
    nombre: 1,
    autonomia: 1,
    provincia_id: 1,
  }); 
  response.status(200).json(users);
});

// Esto realmente es localhost:3001/api/users, según está definido en el index
usersRouter.post("/", async (request,response) => {
  const {body} = request;
  const {username, name, password} = body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password,saltRounds);
  const user = new User({
    username, /* Cuando el parámetro tiene el nombre igual al campo del modelo */
    nombre: name, /* Cuando el parámetro tiene el nombre distinto al campo del modelo */
    passwordHash
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);

});

module.exports = usersRouter;

