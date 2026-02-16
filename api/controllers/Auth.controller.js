import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      message: "Registration Successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      next(handleError(404, "User does not exist. Please register first."));
    }
    const hashedPassword = user.password;
    const comparePassword = bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      next(handleError(401, "Invalid credentials. Please try again."));
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/"
    });
    const newUser = user.toObject({getters: true})
    delete newUser.password
    res.status(200).json({
      success: true,
      newUser,
      message: "Login Successful.",
    })
  } catch (error) {
    next(handleError(500, error.message));
  }
};
