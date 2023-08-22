import {
  registerController,
  loginController,
  protectedController,
} from "../controllers/auth.controller";
import express from "express";

import { authGuard } from "../middlewares/auth";

const router = express.Router();

router.post("/", registerController);
router.post("/login", loginController);
router.get("/", authGuard, protectedController);

export { router };
