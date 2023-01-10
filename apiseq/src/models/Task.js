import {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";

const Task = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING
  },
  done:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Así definimos un campo virtual cuyo valor se calcula a partir de otros reales
  graphpriority: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${"⭐️".repeat(this.priority)}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  } 
},{
  schema: 'cartografia',  // Esquema donde se crea la tabla
  timestamps: false,      // No crea campos createAt y updateAt, en este caso create_at y update_at
  underscored: true,      // Los campos creados por Sequelize usan nombres en snake_case en vez del camelCase
});

export {
  Task
};