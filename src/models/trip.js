import { ObjectId } from "mongodb";

import { dataBase } from "../server.js";

async function create(data) {
  try {
    data.driverId = new ObjectId(data.driverId);
    data.carId = new ObjectId(data.carId);
    const trip = await dataBase.collection("trips").insertOne(data);
    data._id = trip.insertedId;
    return data;
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

async function getTrips() {
  try {
    const trips = await dataBase
      .collection("trips")
      .find({ $or: [{ done: false }, { done: null }] })
      .toArray();

    if (trips.length === 0) {
      throw new Error("No trip available");
    }
    for (const trip of trips) {
      const driver = await dataBase
        .collection("users")
        .findOne({ _id: new ObjectId(trip.driverId) });
      const car = await dataBase
        .collection("cars")
        .findOne({ _id: new ObjectId(trip.carId) });
      trip.driver = driver;
      trip.car = car;
    }
    return trips;
  } catch (err) {
    throw err;
  }
}

export const models = {
  create,
  findDriver,
  getTrips,
};
