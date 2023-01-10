import {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";
import {Task} from "./Task.js";

const Project = sequelize.define("projects", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.INTEGER
  },
  budget:{
    type: DataTypes.FLOAT,
    defaultValue: 0,
    // Dado el valor devuelto, podemos acceder a él y aplicar un formato en función de su valor
    get(){
      const rawValue = this.getDataValue("budget");
      return rawValue>0 ? `💰 ${rawValue}` : `No 💶`
    }
  },
  description: {
    type: DataTypes.STRING
  }
},{
  schema: 'cartografia',  // Esquema donde se crea la tabla. Si no se pone se hará en public
  // tableName: 'tabname' // Podemos especificar el nombre de la tabla. Si no lo hacemos, pluralizará el nombre de la clase User -> Users
  timestamps: true,       // Crea campos createAt y updateAt, en este caso create_at y update_at
  underscored: true,      // Los campos creados por Sequelize usan nombres en snake_case en vez del camelCase
  paranoid: true,         // Así cuando se borra un registro, no se elimina, sino que se marca con una fecha de eliminación
});

//hasOne, belongsTo, hasMany, belongsToMany

Project.hasMany(Task,{
  foreignkey: "project_id",
  sourceKey: "id"
});

Task.belongsTo(Project,{
  foreignkey: "project_id",
  targetId: "id"
})


export {
  Project
};





