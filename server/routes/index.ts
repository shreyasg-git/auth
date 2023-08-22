import express from "express";
// import router from "./auth" as authRouter ;
import { router as authRouter } from "./auth";
// import createError from "http-errors";
import createHttpError from "http-errors";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRouter);

// router.use(async (req: any, res: any, next: any) => {
//   next(createHttpError.NotFound("Route not Found"));
// });

router.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  });
});

export default router;
