import Joi from "joi";
import bcrypt from "bcrypt";

import { dataBase } from "../server.js";

async function login(data) {
  try {
    const user = await dataBase
      .collection("users")
      .findOne({ username: data.username });
    console.log(user);
    if (!user) throw new Error("User not found!");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Password is incorrect!");

    return user;
  } catch (err) {
    throw new Error(err);
  }
}

export const models = {
  login,
};
