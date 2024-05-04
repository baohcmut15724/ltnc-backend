import { StatusCodes } from "http-status-codes";
import { findShortestPath } from "../graph.js";
import { models } from "../models/trip.js";
import "dotenv/config";

async function create(req, res) {
  try {
    let data = req.body;

    data.done = null;
    const { path, totalWeight } = findShortestPath(data.source, data.target);
    data.route = path;
    data.distance = totalWeight;

    let cost = {
      xăng: process.env.costXang,
      dầu: process.env.costDau,
      điện: process.env.costDien,
    };

    data.expense = totalWeight * cost[data.fuel];
    data.expectedTimeCome =
      data.departureTime + (totalWeight / 50) * 60 * 60 * 1000;
    data.timeCome = null;

    delete data.fuel;

    res.status(StatusCodes.CREATED).json(await models.create(data));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function findDriver(req, res) {
  try {
    if (req.body.source === req.body.target)
      throw new Error("Source and target must be different");
    const list = await models.findDriver(req.body);
    res.status(StatusCodes.OK).json(list);
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function getTrips(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.getTrips());
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function deleteTrip(req, res) {
  try {
    await models.deleteTrip(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Delete successfully" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function getAllTrips(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.getAllTrips());
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

export const controllers = {
  create,
  findDriver,
  getTrips,
  deleteTrip,
  getAllTrips,
};
