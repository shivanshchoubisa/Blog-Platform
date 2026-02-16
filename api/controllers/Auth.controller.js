import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      next(handleError(409, "User already exists. Please login instead."));
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({
        success: true,
        message: "Registration Successful."
    })
  } catch (error) {
    next(handleError(500, error.message))
  }
};
export const Login = async (req, res) => {};
