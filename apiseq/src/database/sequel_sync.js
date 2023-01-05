import { sequelize } from "./database.js";
import "../models/Project.js";
import "../models/Task.js";


const main = async () => {
  try {
    await sequelize.authenticate();
    console.log(`🍉 Database conectada`);
    await sequelize.sync({force:true});
    console.log(`Tablas sincronizadas 💪`);
  } catch (error) {
    console.error("☢️ Fail connection",error);
  }
};

main();
