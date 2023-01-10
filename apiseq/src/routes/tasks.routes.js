import { Router } from "express";
import { tasksFetcher, taskCreator, manyTasksCreator, taskUpdater, taskDestroyer, specificTaskFetcher } from "../controllers/tasks.controller.js";

const tasksRouter = Router();

// get all projects
tasksRouter.get("/", tasksFetcher);

// get one projects
tasksRouter.get("/:taskId", specificTaskFetcher);

// create one project
tasksRouter.post("/", taskCreator);

// create many projects
tasksRouter.post("/createManyTasks", manyTasksCreator);

// edit one project
tasksRouter.put("/:taskId", taskUpdater);

// delete one project
tasksRouter.delete("/:taskId", taskDestroyer);

export default tasksRouter;