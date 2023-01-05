import { Router } from "express";
import { projectsFetcher } from "../controllers/projects.controller.js";

const projectsRouter = Router();

// get all projecst
projectsRouter.get("/", projectsFetcher);

export default projectsRouter;