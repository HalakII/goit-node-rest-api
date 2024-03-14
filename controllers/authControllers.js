import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { registerUser, findUser } from "../services/authSevices.js";

const register = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }
  const newUser = await registerUser(req.body);
  res.status(201).json({
    email: newUser.email,
  });
};

export default { register: ctrlWrapper(register) };
