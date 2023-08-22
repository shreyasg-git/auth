// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";
// const express = require("express");
import express from "express";
// const cors = require("cors");
import cors from "cors";
require("dotenv").config();
// const route = require("./routes");
import router from "./routes";
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;
app.use("/", router);
app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export { prisma };
