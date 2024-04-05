import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import { controllers } from "../controllers/testController.js";

async function create(req, res) {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30).trim().strict(),
    password: Joi.string().required().min(8).max(12).trim().strict(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    controllers.create(req, res);
  } catch (err) {
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error_rgf: err.message });
  }
}

export const validations = {
  create,
};
