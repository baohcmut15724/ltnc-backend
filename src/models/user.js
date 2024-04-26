import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

import { dataBase } from "../server.js";

async function login(data) {
  try {
    const user = await dataBase
      .collection("users")
      .findOne({ username: data.username });
    // console.log(user);
    if (!user) throw new Error("User not found!");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Password is incorrect!");

    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
}

async function register(data) {
  data.admin = false;
  data.status = "inactive";
  data.point = 0;
  try {
    const user = await dataBase
      .collection("users")
      .findOne({ $or: [{ username: data.username }, { email: data.email }] });
    if (user) {
      throw new Error("Username or email available");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    data.password = hashPassword;

    return data;
  } catch (err) {
    throw err;
  }
}

async function verify(data) {
  try {
    const user = await dataBase
      .collection("users")
      .findOne({ $or: [{ username: data.username }, { email: data.email }] });

    if (!user) {
      await dataBase.collection("users").insertOne(data);
    }
  } catch (err) {
    throw err;
  }
}

async function logout(data) {
  try {
    await dataBase.collection("users").findOneAndUpdate(
      { _id: new ObjectId(data._id) },
      {
        $set: {
          status: "inactive",
        },
      }
    );
  } catch (err) {
    throw err;
  }
}

async function available(data) {
  try {
    await dataBase.collection("users").findOneAndUpdate(
      { _id: new ObjectId(data._id) },
      {
        $set: {
          status: "available",
        },
      }
    );
  } catch (err) {
    throw err;
  }
}

async function profile(data) {
  try {
    const user = await dataBase
      .collection("users")
      .findOne({ _id: new ObjectId(data._id) });
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
}

async function updateProfile(data, id) {
  try {
    const user = await dataBase.collection("users").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
        },
      },
      {
        returnDocument: "after",
      }
    );
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
}

async function getAllUser() {
  try {
    const users = await dataBase
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .toArray();
    return users;
  } catch (err) {
    throw err;
  }
}

export const models = {
  login,
  register,
  verify,
  logout,
  available,
  profile,
  updateProfile,
  getAllUser,
};
