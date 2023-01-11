require("dotenv").config();

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  define:{
    schema: process.env.DB_SCHEMA || "public",  // Esquema donde se crea la tabla. Si no se pone se hará en public
    underscored: true,                          // Los campos creados por Sequelize usan nombres en snake_case en vez del camelCase
  }
};

