import asyncHandler from 'express-async-handler';
import User from '../../models/auth/user.js';
import generateToken from '../../helpers/generateToken.js';
import bcrypt from 'bcrypt';

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please add all fields" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    
    res.cookie("token", token, {
        httpOnly: true,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: true,
        secure: true
    });

    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
            bio: user.bio,
            isVerified: user.isVerified,
            token
        });
    } else {
        return res.status(400).json({ message: "Invalid user data" });
    }
});



// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please add all fields" });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
        return res.status(400).json({ message: "User does not exist, please sign up!" });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(userExists._id);
    res.cookie("token", token, {
        httpOnly: true,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: true,
        secure: true
    });

    return res.status(200).json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
        photo: userExists.photo,
        bio: userExists.bio,
        isVerified: userExists.isVerified,
        token
    });
});



export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});


export const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("-password");
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });


  export const updateUser = asyncHandler(async (req, res) => {
    // get user details from the token ----> protect middleware
    const user = await User.findById(req.user._id);
  
    if (user) {
      // user properties to update
      const { name, bio, photo } = req.body;
      // update user properties
      user.name = req.body.name || user.name;
      user.bio = req.body.bio || user.bio;
      user.photo = req.body.photo || user.photo;
  
      const updated = await user.save();
  
      res.status(200).json({
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        photo: updated.photo,
        bio: updated.bio,
        isVerified: updated.isVerified,
      });
    } else {
      // 404 Not Found
      res.status(404).json({ message: "User not found" });
    }
  });