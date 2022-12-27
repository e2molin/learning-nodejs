// Importamos una clase que nos permite crear un Router de forma separada a lo que tendemo definido en el index.js
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

loginRouter.post("/", async (request, response) => {

  const { body } = request;
  const { username, password } = body;

  const user = await User.findOne({username});
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect){
    response.status(401).json({
      error: "invalid user or password"
    });
  }

  response.send({
    name: user.nombre,
    username: user.username
  });

});


module.exports = loginRouter;