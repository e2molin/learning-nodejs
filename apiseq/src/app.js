import express from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects.routes.js';

const app = express();

app.use(cors());  // Usamos este middleware para que cualquier origen funcione con nuestra API
app.use(express.json());  // Usamos este middleware para trabajar con ficheros JSON


// Desde aquí podemos servir estáticos como http://localhost:3001/static/develmap.svg 
// Este middleware 👇 sólo se ejecuta desde la ruta /static

//API raíz
app.get("/", (request, response) => {
  response.send("<h1>APIBADASID by Sequelize is 🚀</h1>");
});

// EndPoints de proyects
app.use("/projects", projectsRouter);

export default app;