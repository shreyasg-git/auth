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
router.get("/protected", authGuard, protectedController);

export { router };
