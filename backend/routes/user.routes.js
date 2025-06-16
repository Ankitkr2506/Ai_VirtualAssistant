import express from "express";
import { getCurrentUser, updateAssistant } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import uploadmulter from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.post("/update", isAuth, uploadmulter.single("assistantImage"), updateAssistant)
export default userRouter;


