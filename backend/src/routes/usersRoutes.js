import express from "express";
import { registerUser,loginUser,logoutUser, getUser,updateUser } from "../controllers/auth/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser)
userRouter.get("/logout",logoutUser)
userRouter.get("/user",protect,getUser);
userRouter.patch("/user", protect, updateUser);

export default userRouter