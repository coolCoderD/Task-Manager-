import asyncHandler from 'express-async-handler';
import User from '../../models/auth/user.js';
import generateToken from '../../helpers/generateToken.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register User
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
    await user.save();

    if (!user) {
        return res.status(400).json({ message: "Invalid user data" });
    }

    const token = generateToken(user._id);

    // Set the cookie and return the final response (no multiple responses)
    res.cookie("token", token, {
        httpOnly: true,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "None",
    });

    // This is the only response sent
    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
        bio: user.bio,
        isVerified: user.isVerified,
        token
    });
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
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(userExists._id);


    if (userExists && isMatch) {
        // Set cookie and return user data in the same response
        res.cookie("token", token, {
            httpOnly: true,
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "None",
        });


        // Return the final response (no further responses after this)
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
    }

    return res.status(400).json({ message: "Invalid credentials" });
});


// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
});

// Get Single User
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Update User
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { name, bio, photo ,role} = req.body;
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.photo = photo || user.photo;
        user.role = role || user.role;

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
        res.status(404).json({ message: "User not found" });
    }
});


export const userLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authorized, please login!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json(true); // Token is valid
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token, please login!" });
    }
});


// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get All Users
export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
