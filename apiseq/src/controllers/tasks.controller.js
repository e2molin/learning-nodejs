import {Task} from "../models/Task.js";

export const tasksFetcher = async (request, response,next) => {

  try {
    const tasks = await Task.findAll({
      atributes: ["id", "name", "priority", "description", "done"],
    });
    response.status(200).json(tasks);
  } catch (error) {
    next(error);
  }

}

export const specificTaskFetcher = async (request, response,next) => {
  const { taskId } = request.params;

  try {
    const taskReturned = await Task.findByPk(taskId,
      {
        attributes: ["name", "priority",  "done"]
      });
    return taskReturned
      ? response.status(200).json(taskReturned)
      : response.status(404).end();
  } catch (error) {
    next(error);
  }
}

export const taskCreator = async (request, response,next) => {
  const {name, priority, done, description, projectId} = request.body;

  try {
    const newTask = await Task.create({
      name,
      priority,
      description,
      done,
      projectId,
    });    
    response.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}

export const manyTasksCreator = async (request, response,next) => {

  try {
    const newTasks = await Task.bulkCreate(request.body);    
    response.status(201).json(newTasks);
  } catch (error) {
    next(error);
  };
}

export const taskUpdater = async (request, response,next) => {

  try {
    const { taskId } = request.params;
    const { name, priority, description, done, projectId } = request.body;

    const task = await Task.findByPk(taskId); // Localizamos el elemento que queremos actualizar

    //En el objeto recibido sólo actualizamos las propiedades que recibimos por body
    name && (task.name = name);
    priority && (task.priority = priority);
    description && (task.description = description);
    done && (task.done = done);
    projectId && (task.projectId = projectId);

    // Sólo se modificarán los atributos recibidos y el campo updatedAt si existe.
    const taskUpdated = await task.save();

    response.status(200).json({
      message: "Task update",
      data: taskUpdated,
    });

  } catch (error) {
    next(error);
  }

}

export const taskDestroyer = async (request, response,next) => {
  // El next tiene que estar entre los parámetros para acceder al middelware
  const { taskId } = request.params;

  try {
    await Task.destroy({
      where: {
        id: taskId,
      },
    });
    response.status(204).end();
  } catch (error) {
    next(error);
  }

}