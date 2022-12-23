const mongoose = require("mongoose");
const { serverAPI } = require("../index");
const Users = require("../models/Provincia");
const bcrypt = require("bcrypt");
const { api, getAllUsers,  } = require("./helpers");
const User = require("../models/User");



describe("Create a new users", () => {

  beforeEach(async () => {
    await User.deleteMany({}); // Así borra todas las notas de la colección
    const passwordHash = await bcrypt.hash("pass",10)
    const user = new User({username:"jdoe", nombre:"John Doe", passwordHash});
    await user.save();

  });

  test("works as expected creating a fresh username", async () => {

    const usersAtStart = await getAllUsers();

    const newUser = {
      username: "user1",
      name: "nombre1",
      password: "pass1"
    };

    await api
      .post("/api/users") // Endpoint que consultamos para superar este test
      .send(newUser)  // enviamos el nuevo usuario
      .expect(201) // 🧪️ Status que esperamos de vuelta
      .expect("Content-Type", /application\/json/); // 🧪️ Formato esperado

    const usersAtEnd =  await getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1);// 🧪️
    
    const usernames = usersAtEnd.map(user=>user.username);
    expect(usernames).toContain(newUser.username); // 🧪️

  });

  // Esto es un hook que se ejecuta al terminar todos los tests. Recibe un callback que se ejecutará después de todos los test
  afterAll(() => {
    mongoose.connection.close();
    serverAPI.close();
  });


});



