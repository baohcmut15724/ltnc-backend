import { StatusCodes } from "http-status-codes";

import { models } from "../models/car.js";

async function create(req, res) {
  try {
    res.status(StatusCodes.CREATED).json(await models.create(req.body));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function update(req, res) {
  try {
    res
      .status(StatusCodes.OK)
      .json(await models.update(req.body, req.params.id));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function getCars(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.getCars());
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function deleteCar(req, res) {
  try {
    await models.deleteCar(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Car deleted" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function makeMaintenance(req, res) {
  try {
    res
      .status(StatusCodes.OK)
      .json(await models.makeMaintenance(req.body, req.params.id));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function maintenance(req, res) {
  try {
    await models.maintenance(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Maintenance start" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

async function maintenanceDone(req, res) {
  try {
    await models.maintenanceDone(req.body, req.params.id);
    res.status(StatusCodes.OK).json({ message: "Maintenance done" });
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
  update,
  getCars,
  deleteCar,
  makeMaintenance,
  maintenance,
  maintenanceDone,
};
