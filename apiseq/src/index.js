import app from "./app.js";
import { sequelize } from "./database/database.js";
import * as dotenv from "dotenv";

dotenv.config();

try {
  await sequelize.authenticate();
  console.log(`🍉 Database conectada`);
} catch (error) {
  console.error("☢️ Fail connection",error);
}



app.get("/", (request, response) => {
  console.log(`⚙️ Server running en puerto ${request.method}`);
  
  response.send("<h1>APISQL está 🚀</h1>");
});

app.listen(3000);
console.log(`Server is listening 🎧 on 3000`);
console.log(process.env.DB_USER);