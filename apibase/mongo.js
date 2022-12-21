const mongoose = require("mongoose");
const connectionString = process.env.MONGO_DB_URI;

mongoose.connect(connectionString,{
}).then(()=>{
  console.error("💾 Database connected");
}).catch((err)=>{
  console.error(err);
});

/** 
 * Ahora ada vez que pete se cierra la conexión
 */
process.on("uncaughtException", ()=>{
  console.info("👋 Database disconnect");
  mongoose.connection.disconnect();
});

