import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

require("dotenv").config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const signAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
      if (err) {
        reject(createHttpError.InternalServerError());
      }
      resolve(token);
    });
  });
};

export const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        return reject(createHttpError.Unauthorized(message));
      }
      resolve(payload);
    });
  });
};
