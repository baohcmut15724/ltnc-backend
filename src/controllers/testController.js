import { StatusCodes } from "http-status-codes";

async function create(req, res) {
  try {
    // console.log("res.body: ", req.body);
    // console.log("req.query: ", req.query);
    // console.log("req.params: ", req.params);
    // throw new Error("Loi tu controller");

    res
      .status(StatusCodes.CREATED)
      .json({ message: "POST: Du lieu da di den tang controller" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error_rgf: err.message });
  }
}

export const controllers = {
  create,
};
