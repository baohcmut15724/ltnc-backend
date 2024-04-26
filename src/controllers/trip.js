import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { models } from "../models/trip.js";

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

export const controllers = {
  create,
};
