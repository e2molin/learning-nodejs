const express = require('express');
const app = express();
const { connection } = require("../database/db.js"); 

// Cargamos los controladores de rutas que vamos a usar
const usersRouter = require("./routes/user.routes.js");

// Setting
const PORT = process.env.PORT || 3000;

// Middleware
// Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.get('/', function (req, res) {
    res.json({ hola: "Mundo "});
});

// EndPoints de provincias
app.use("/users",usersRouter);


// Arrancamos el servidor
app.listen(PORT, function () {
  console.log(`Server is listening 🎧 on ${PORT}`);

     connection.sync({ force: false })
      .then(() => {
          console.log(`🍉 Database conectada with 🧔 ${process.env.DB_USER}`);
      })
      .catch(error => {
        console.error("☢️ Fail connection",error);
      });
});
