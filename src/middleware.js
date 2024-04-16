import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Access denied!, token not found" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid token!" });
  }
}
