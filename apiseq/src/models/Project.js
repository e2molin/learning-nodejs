import {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";
import Task from "./Task.js";

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
    defaultValue: 0
  },
  description: {
    type: DataTypes.STRING
  }
},{
  schema: 'cartografia',
  timestamps: true
});

Project.hasMany(Task,{
  foreignkey: "project_id",
  sourceKey: "id"
});

Task.belongsTo(Project,{
  foreignkey: "project_id",
  targetId: "id"
})

export default Project;




