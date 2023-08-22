require("dotenv").config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { prisma } from "../index";
import { signAccessToken, verifyAccessToken } from "../utils/tokens";

export const registerUser = async (data) => {
  const { email } = data;
  data.password = bcrypt.hashSync(data.password, 8);
  let user = await prisma.user.create({
    data: { email: email, password: data.password },
  });

  data.accessToken = await signAccessToken(user);

  return data;
};

export const login = async (data) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw createHttpError.NotFound("User not registered");
  }
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    throw createHttpError.Unauthorized("Email address or password not valid");
  delete user.password;
  const accessToken = await signAccessToken(user);
  return { ...user, accessToken };
};
