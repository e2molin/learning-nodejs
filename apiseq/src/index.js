import app from "./app.js";
import { sequelize } from "./database/database.js";
import * as dotenv from "dotenv";
dotenv.config();


// Probamos conexión a la database
try {
  await sequelize.authenticate();
  console.log(`🍉 Database conectada with 🧔 ${process.env.DB_USER}`);
} catch (error) {
  console.error("☢️ Fail connection",error);
}
const PORT = process.env.PORT || 3001; // Esto lo necesitan deployers como heroku.

const serverAPI = app.listen(PORT, () => {
  // Es más correcto usar esto porque el método listen es asíncrono y puede haber una pequeña latencia.
  console.log(`Server is listening 🎧 on ${PORT}`);
});
