import { StatusCodes } from "http-status-codes";
import { findShortestPath } from "../graph.js";
import { models } from "../models/trip.js";
import "dotenv/config";

async function create(req, res) {
  try {
    res.status(StatusCodes.OK).json();
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
    let data = req.body;
    // data.done = null;
    // const { path, totalWeight } = findShortestPath(data.source, data.target);
    // data.route = path;
    // data.distance = totalWeight;
    // data.expectedTimeCome =
    //   data.departureTime + (totalWeight / 50) * 60 * 60 * 1000;

    const list = await models.findDriver(data);
    res.status(StatusCodes.OK).json(list);
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
};
