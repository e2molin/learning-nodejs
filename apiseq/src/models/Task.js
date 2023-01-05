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
  }  
},{
  schema: 'cartografia',  // Esquema donde se crea la tabla
  timestamps: false // No crea campos createAt y updateAt
});

export default Task;