import { StatusCodes } from "http-status-codes";
import { models } from "../models/testModel.js";

async function create(req, res) {
  try {
    res.status(StatusCodes.CREATED).json(await models.create(req.body));
  } catch (err) {
    err = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: err.stack,
    });
  }
}

export const controllers = {
  create,
};
