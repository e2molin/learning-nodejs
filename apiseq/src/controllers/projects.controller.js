import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

// Devolver todos los projectos
export const projectsFetcher = async (request, response,next) => {

  try {
    const projects = await Project.findAll({
      attributes: ["id", "name", "priority", "description", "budget"]
      //attributes: {exclude: ["priority"]} // Así podemos evitar transferir un campo
    });
    response.status(200).json(projects);
  } catch (error) {
    next(error);
  }

};

// Devolver todos los projectos con sus tareas anidaddas
export const projectsAndTaskNested = async (request, response,next) => {

  try {
    const projects = await Project.findAll({
      attributes: ["id", "name", "priority", "description", "budget"],
      include: {
        "model": Task,
        "attributes": ["name", "graphpriority", "done"]
      }
    });
    response.status(200).json(projects);
  } catch (error) {
    next(error);
  }

};

// Obtener proyecto por Id
export const specificProjectFetcher = async (request, response,next) => {
  
  const { projectId } = request.params;

  try {
    const projectReturned = await Project.findByPk(projectId,
      {
        attributes: ["name", "priority",  "budget"]
      });
    return projectReturned
      ? response.status(200).json(projectReturned)
      : response.status(404).end();
  } catch (error) {
    next(error);
  }

};

// Crear un proyecto
export const projectCreator = async (request, response,next) => {
  
  const {name, priority, budget, description} = request.body;

  try {
    const newProject = await Project.create({
      name,
      priority,
      budget,
      description,
    });    
    response.status(201).json(newProject);
  } catch (error) {
    next(error);
  }

};

// Crear un bulk de proyectos
export const manyProjectsCreator = async (request, response,next) => {

  try {
    const newProject = await Project.bulkCreate(request.body);    
    response.status(201).json(newProject);
  } catch (error) {
    next(error);
  }

};

// Actualizar las propiedades recibidas de un proyecto
export const projectUpdater = async (request, response,next) => {

  try {
    const { projectId } = request.params;
    const { name, priority, description, budget } = request.body;

    const project = await Project.findByPk(projectId); // Localizamos el elemento que queremos actualizar

    //En el objeto recibido sólo actualizamos las propiedades que recibimos por body
    name && (project.name = name);
    priority && (project.priority = priority);
    description && (project.description = description);
    budget && (project.budget = budget);

    // Sólo se modificarán los atributos recibidos y el campo updatedAt si existe.
    const projectUpdated = await project.save();

    response.status(200).json({
      message: "Project update",
      data: projectUpdated,
    });

  } catch (error) {
    next(error);
  }

}

// Eliminar proyecto
export const proyectDestroyer = async (request, response,next) => {
  // El next tiene que estar entre los parámetros para acceder al middelware
  const { projectId } = request.params;
  console.log(projectId);
  try {
    await Project.destroy({
      where: {
        id: projectId,
      },
    });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
}

export const getProjectTasks = async (request, response,next) => {
  try {
    const { projectId } = request.params;
    const tasks = await Task.findAll({
      where: { projectId:projectId },
    });
    response.status(200).json(tasks);

  } catch (error) {
    next(error);
  }
}
