const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js");
const db = {};

db.connection = new Sequelize(config.database, config.username, config.password, config);

// Vinculamos a nuestros objetos

db.User = require("../src/models/User.js")(db.connection, DataTypes);
db.Address = require("../src/models/Address.js")(db.connection, DataTypes);

module.exports = db;