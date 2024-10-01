import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/user.js";

export const protect = asyncHandler(async (req, res, next) => {
    try {

        const token = req.cookies['token'];
        console.log(token);
        if (!token) {
            
            return res.status(401).json({ message: "Not authorized, please login!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Fetch the user details using the ID from the token, excluding the password
        const user = await User.findById(decoded.id).select("-password");
        // If user doesn't exist, send a 404 Not Found response
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        // Set user details in the request object
        req.user = user;
        // Call next middleware
        next();
    } catch (error) {
        // 401 Unauthorized if token verification fails
        return res.status(401).json({ message: "Not authorized, token failed!" });
    }
});


export const adminMiddleware=asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next();
        return;
    }else{
        return res.status(403).json({message:"Not authorized as admin!"})
    }
})

export const creatorMiddleware=asyncHandler(async(req,res,next)=>{
    if((req.user && req.user.role==='creator') || (req.user && req.user.role==='admin')){
        next();
        return;
    }else{
        return res.status(403).json({message:"Not authorized as creator!"})
    }
})

export const verifiedMiddleware=asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.verified){
        next();
        return; 
    }else{
        return res.status(403).json({message:"Please verify your email address!"})
    }
})
