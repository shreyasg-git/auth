import { PrismaClient } from "@prisma/client";
import express from "express";
const cors = require("cors");
require("dotenv").config();
import jwt from "jsonwebtoken";
import router from "./routes";

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  const token = req.cookies.Authorization;
  console.log("TOKEN", token);
  if (token) {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET
    );
    // @ts-expect-error
    req.user = decoded;
    console.log("DECODED ::", decoded);
  }
  next();
});

app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export { prisma };
