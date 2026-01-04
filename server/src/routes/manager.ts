import { Router } from "express";
import { world } from "../index";

export const managerRouter = Router();

managerRouter.get("/", (req, res) => {
  res.json(world.manager);
});

// Later: endpoints for renaming manager, job offers, etc.
