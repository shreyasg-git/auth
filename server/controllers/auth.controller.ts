import { registerUser, login } from "../services/auth.services";
import createHttpError from "http-errors";

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(200).json({
      status: true,
      message: "User created successfully",
      data: user,
    });
  } catch (e) {
    // next(createHttpError(e.statusCode, e.message));
    console.log("ERRRRR", e);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const data = await login(req.body);
    res.status(200).json({
      status: true,
      message: "Account login successful",
      data,
    });
  } catch (e) {
    next(createHttpError(e.statusCode, e.message));
  }
};
export const protectedController = async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      message: "You Are Logged In",
    });
  } catch (e) {
    next(createHttpError(e.statusCode, e.message));
  }
};
