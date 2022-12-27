// Importamos una clase que nos permite crear un Router de forma separada a lo que tendemo definido en el index.js
const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

loginRouter.post("/", async (request, response) => {

  const { body } = request;
  const { username, password } = body;

  const user = await User.findOne({username});
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)){
    response.status(401).json({
      error: "invalid user or password"
    });
  }

  // Preparamos el token para el usuario
  const userForToken = {
    id: user._id,
    username: user.username
  };

  const token = jwt.sign(userForToken, process.env.SECRET_KEY_JWT,{
    expiresIn: 60*60*24*7 // Tiempo en segundos
  });


  response.send({
    name: user.nombre,
    username: user.username,
    token
  });

});


module.exports = loginRouter;