import express from "express";
import { StatusCodes } from "http-status-codes";
import { validations } from "../validations/car.js";
import { controllers } from "../controllers/car.js";
import { verifyTokenAdmin } from "../middleware.js";

export const carRouter = express.Router();

carRouter.use(verifyTokenAdmin);

carRouter.get("/", controllers.getCars);
carRouter.post("/", validations.create, controllers.create);
carRouter.put("/:id", validations.update, controllers.update);
carRouter.delete("/:id", controllers.deleteCar);
carRouter.post(
  "/makeMaintenance/:id",
  validations.makeMaintenance,
  controllers.makeMaintenance
);

carRouter.get("/maintenance/:id", controllers.maintenance);
carRouter.post(
  "/maintenanceDone/:id",
  validations.maintenanceDone,
  controllers.maintenanceDone
);
