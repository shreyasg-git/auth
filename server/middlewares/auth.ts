// const jwt = require("../utils/jwt");
// const createError = require("http-errors");
import createHttpError from "http-errors";
import { verifyAccessToken } from "../utils/tokens";

export const authGuard = async (req, res, next) => {
  const token = req.cookies.Authorization.split(" ")[1];
  console.log("AAAAAAAAAAA TOKEN - ", token);

  if (!token) {
    return next(createHttpError.Unauthorized("Access token is required"));
  }
  // const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createHttpError.Unauthorized());
  }
  await verifyAccessToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => {
      next(createHttpError.Unauthorized(e.message));
    });
};
