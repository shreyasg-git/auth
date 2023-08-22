import { registerUser, login } from "../services/auth.services";
import createHttpError from "http-errors";
import { prisma } from "..";
import jwt from "jsonwebtoken";

export const registerController = async (req, res, next) => {
  try {
    const alreadyExists = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (alreadyExists) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
        // data: user,
      });
    }

    const user = await registerUser(req.body);
    res.cookie("Authorization", `Bearer ${user.accessToken}`, {
      // httpOnly: true,
    });
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
