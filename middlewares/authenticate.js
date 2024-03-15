import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authSevices.js";
// import "dotenv/config";

const { JWT_SECRET } = process.env;
console.log(JWT_SECRET);

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await findUser({ _id: id });

    if (!user) {
      return next(HttpError(401, "User not found"));
    }
    // if (!user.token) {
    //   return next(HttpError(401, "User already signout"));
    // }
    // req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
