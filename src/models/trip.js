import { ObjectId } from "mongodb";

import { dataBase } from "../server.js";

async function create(data) {
  try {
  } catch (err) {
    throw err;
  }
}

async function findDriver(data) {
  try {
    const listDriver = [];
    const users = await dataBase
      .collection("users")
      .find({
        status: "available",
        admin: false,
        drivingLicense: { $in: [data.vehicle] },
      })
      .toArray();
    for (const item of users) {
      const trip = await dataBase.collection("trips").findOne({
        driverId: item._id,
        $or: [{ done: false }, { done: null }],
      });
      if (!trip) {
        listDriver.push(item);
      }
    }
    if (listDriver.length === 0) {
      throw new Error("No driver available");
    }

    const listCar = [];
    const cars = await dataBase
      .collection("cars")
      .find({ status: "inactive", type: data.vehicle })
      .toArray();

    for (const item of cars) {
      const trip = await dataBase.collection("trips").findOne({
        carId: item._id,
        $or: [{ done: false }, { done: null }],
      });
      if (!trip) {
        listCar.push(item);
      }
    }
    if (listCar.length === 0) {
      throw new Error("No car available");
    }

    function compare(a, b) {
      return b.point - a.point;
    }
    listDriver.sort(compare);

    return {
      listDriver,
      listCar,
    };
  } catch (err) {
    throw err;
  }
}

export const models = {
  create,
  findDriver,
};
