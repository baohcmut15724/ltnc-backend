import express from "express";
import { StatusCodes } from "http-status-codes";
import { validations } from "../validations/trip.js";
import { controllers } from "../controllers/trip.js";
import { verifyTokenAdmin } from "../middleware.js";

export const tripRouter = express.Router();

tripRouter.use(verifyTokenAdmin);

tripRouter.get("/", controllers.getTrips);
tripRouter.post("/findDriver", validations.findDriver, controllers.findDriver);
tripRouter.post("/", validations.create, controllers.create);
