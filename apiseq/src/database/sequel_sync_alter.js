import { sequelize } from "./database.js";
import "../models/Project.js";
import "../models/Task.js";


const main = async () => {
  try {
    await sequelize.authenticate();
    console.log(`🍉 Database conectada`);
    // Las tablas se destruyen y se vuelven a crear

    // await sequelize.sync(); // Crea la tabla si no existe. Si existe no hace nada
    // await sequelize.sync({force:true}); // Crea la tabla, eliminandola primero si existe, y perdiendo siempre datos
    // await sequelize.sync({alter:true}); // Analiza las tablas, haciendo cambios para que coincida con el modelo. Puedde preserse algún dato
    // await Project.sync({alter:true}); // Sólo se sincroniza el modelo Project
    // await sequelize.sync({ force: true, match: /_test$/ }); // El proceso de sinconización sólo afecta a tablas termiandas en _test
    await sequelize.sync({alter:true});
    
    console.log(`Tablas sincronizadas 🔍`);
  } catch (error) {
    console.error("☢️ Fail connection",error);
  }
};

main();
