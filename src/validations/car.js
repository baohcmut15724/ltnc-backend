import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const schema = Joi.object({
  licensePlate: Joi.string().required().trim().strict(),
  type: Joi.string().required().valid("truck", "coach", "container"),
  size: Joi.string().required().trim().strict(),
  weight: Joi.number().required(),
  fuel: Joi.string().required().valid("xăng", "dầu", "điện"),
});

async function create(req, res, next) {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
      stack: newError.stack,
    });
  }
}

async function update(req, res, next) {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
      stack: newError.stack,
    });
  }
}

async function makeMaintenance(req, res, next) {
  try {
    await Joi.object({
      kmMaintenance: Joi.number().required(),
    }).validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
      stack: newError.stack,
    });
  }
}

async function maintenanceDone(req, res, next) {
  try {
    await Joi.object({
      cost: Joi.number().required(),
    }).validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
      stack: newError.stack,
    });
  }
}

export const validations = {
  create,
  update,
  makeMaintenance,
  maintenanceDone,
};
