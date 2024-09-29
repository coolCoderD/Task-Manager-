import express from "express";
import { registerUser,loginUser,logoutUser, getUser,updateUser,deleteUser,getAllUsers } from "../controllers/auth/userController.js";
import { adminMiddleware, protect,creatorMiddleware} from "../middleware/authMiddleware.js";

const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser)
userRouter.get("/logout",logoutUser)
userRouter.get("/user",protect,getUser);
userRouter.patch("/user", protect, updateUser);
userRouter.delete("/admin/user/:id",protect,adminMiddleware,deleteUser);

userRouter.get('/users',protect,creatorMiddleware,getAllUsers);

export default userRouter