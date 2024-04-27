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
      throw new Error("Username or email switchStatus");
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

async function switchStatus(data, available) {
  const sta = available ? "available" : "inactive";
  try {
    await dataBase.collection("users").findOneAndUpdate(
      { _id: new ObjectId(data._id) },
      {
        $set: {
          status: sta,
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

async function history(data) {
  try {
    const trips = await dataBase
      .collection("trips")
      .find({ userId: data._id, done: true })
      .toArray();

    function compare(a, b) {
      return b.timeCome - a.timeCome;
    }
    trips.sort(compare);

    return trips;
  } catch (err) {
    throw err;
  }
}

async function cancelTrip(data, id) {
  try {
    await dataBase.collection("trips").deleteOne({ _id: new ObjectId(id) });

    const users = await dataBase.collection("users").updateOne(
      {
        _id: new ObjectId(data._id),
      },
      {
        $inc: { point: -1 },
      }
    );
    console.log(users);
  } catch (err) {
    throw err;
  }
}

async function startTrip(data, id) {
  try {
    const trip = await dataBase.collection("trips").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          done: false,
        },
      },
      {
        returnDocument: "after",
      }
    );
    // const carId = trip.carId;
    // const driverId=req.user._id;

    const car = await dataBase.collection("cars").findOneAndUpdate(
      {
        _id: new ObjectId(trip.carId),
      },
      {
        $set: {
          status: "active",
        },
      },
      {
        returnDocument: "after",
      }
    );

    await dataBase.collection("users").findOneAndUpdate(
      {
        _id: new ObjectId(trip.driverId),
      },
      {
        $set: {
          status: "occupied",
        },
      },
      {
        returnDocument: "after",
      }
    );
    return { trip, car };
  } catch (err) {
    throw err;
  }
}

async function finishTrip(data, id) {
  try {
    const timeCome = new Date().getTime();
    const trip = await dataBase.collection("trips").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          done: true,
          timeCome: timeCome,
        },
      },
      {
        returnDocument: "after",
      }
    );

    const car = await dataBase.collection("cars").findOneAndUpdate(
      {
        _id: new ObjectId(trip.carId),
      },
      {
        $set: {
          status: "inactive",
        },
        $inc: { kmTraveled: trip.distance },
      },
      {
        returnDocument: "after",
      }
    );

    await dataBase.collection("users").findOneAndUpdate(
      {
        _id: new ObjectId(trip.driverId),
      },
      {
        $set: {
          status: "available",
        },
        $inc: { point: 1 },
      },
      {
        returnDocument: "after",
      }
    );
    // return { trip, car };
  } catch (err) {
    throw err;
  }
}

async function getWaitingTrip(id) {
  try {
    // console.log(id);
    const trip = await dataBase
      .collection("trips")
      .findOne({ done: null, driverId: id });

    // console.log(trip);
    const car = await dataBase
      .collection("cars")
      .findOne({ _id: new ObjectId(trip.carId) });
    return { trip, car };
  } catch (err) {
    throw err;
  }
}

export const models = {
  login,
  register,
  verify,
  switchStatus,
  profile,
  updateProfile,
  getAllUser,
  history,
  cancelTrip,
  startTrip,
  finishTrip,
  getWaitingTrip,
};
