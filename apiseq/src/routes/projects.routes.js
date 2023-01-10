import { Router } from "express";
import { 
  projectsFetcher, 
  projectCreator, 
  manyProjectsCreator, 
  projectUpdater, 
  proyectDestroyer, 
  specificProjectFetcher, 
  getProjectTasks,
  projectsAndTaskNested
} from "../controllers/projects.controller.js";

const projectsRouter = Router();

// get all projects
projectsRouter.get("/", projectsFetcher);

// create one project
projectsRouter.post("/", projectCreator);

projectsRouter.get("/andtasks", projectsAndTaskNested);

// create many projects
projectsRouter.post("/createManyProjects", manyProjectsCreator);

// edit one project
projectsRouter.put("/:projectId", projectUpdater);

// delete one project
projectsRouter.delete("/:projectId", proyectDestroyer);

// get one projects
projectsRouter.get("/:projectId", specificProjectFetcher);

// get tasks belongs to a project
projectsRouter.get("/:projectId/tasks", getProjectTasks);


export default projectsRouter;