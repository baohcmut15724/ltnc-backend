import Joi from "joi";
import { StatusCodes } from "http-status-codes";

async function create(req, res, next) {
  const schema = Joi.object({
    driverId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    carId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    title: Joi.string().required().trim().strict(),
    description: Joi.string().optional().trim().strict(),
    departureTime: Joi.date().required(),
    source: Joi.string().required().trim().strict(),
    target: Joi.string().required().trim().strict(),
    revenue: Joi.number().required(),
    vehicle: Joi.string().required().valid("truck", "coach", "container"),
    fuel: Joi.string().required().valid("xăng", "dầu", "điện"),
  });

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

async function findDriver(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required().trim().strict(),
    description: Joi.string().optional().trim().strict(),
    departureTime: Joi.date().required(),
    source: Joi.string().required().trim().strict(),
    target: Joi.string().required().trim().strict(),
    revenue: Joi.number().required(),
    vehicle: Joi.string().required().valid("truck", "coach", "container"),
  });

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

export const validations = {
  create,
  findDriver,
};
