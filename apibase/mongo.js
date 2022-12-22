const mongoose = require("mongoose");

// Extraemos las variables de entorno que necesitamos
const {MONGO_DB_URI,MONGO_DB_URI_TEST,NODE_ENV} = process.env;

const connectionString = NODE_ENV ==="test"
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI;

// comment for students puposes
if (!connectionString) {
  console.error("Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string. En las clases usamos MongoDB Atlas pero puedes usar cualquier base de datos de MongoDB (local incluso).");
}

mongoose.set("strictQuery", false);
mongoose.connect(connectionString,{
}).then(()=>{
  NODE_ENV === "test"
    ? console.info("💾 TEST Database connected")
    : console.info("💾 PRODUCTION Database connected ⚠️");
}).catch((err)=>{
  console.error(err);
});

/** 
 * Ahora ada vez que pete se cierra la conexión
 */
process.on("uncaughtException", ()=>{
  console.info("👋 Database disconnect");
  mongoose.connection.close();
});

