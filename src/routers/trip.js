import express from "express";
import { StatusCodes } from "http-status-codes";
import { validations } from "../validations/trip.js";
import { controllers } from "../controllers/trip.js";
import { verifyTokenAdmin } from "../middleware.js";

export const tripRouter = express.Router();

tripRouter.use(verifyTokenAdmin);

// tripRouter.get("/trips", controllers.getTrips);

tripRouter.post("/create", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "POST: create trip thanh cong" });
});
