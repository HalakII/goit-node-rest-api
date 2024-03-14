import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import {
  registerUser,
  findUser,
  validatePassword,
} from "../services/authSevices.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }
  const newUser = await registerUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await validatePassword(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  res.json({ token, user });
  //   const decodeToken = jwt.decode(token);
  // try{ const {id}}catch{}
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
