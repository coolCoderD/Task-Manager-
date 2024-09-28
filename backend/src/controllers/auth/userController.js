import asyncHandler from 'express-async-handler'
import User from '../../models/auth/user.js';
import generateToken from '../../helpers/generateToken.js';
import bcrypt from 'bcrypt';


export const  registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        res.status(400).json({message:"Please add all fields"})
    }

    if(password.length<6){
        res.status(400).json({message:"Password must be at least 6 characters"})       
    }

    const userExists=await User.findOne({email});
    if(userExists){   
        res.status(400).json({message:"User already exists"})
    }

    const user=await User.create({
        name,
        email,
        password
    });

    const token=generateToken(user._id);
    res.cookie("token",token,{httpOnly:true,
        path:'/',
        maxAge:30*24*60*60*1000,
        sameSite:true,
        secure:true
    });

    if(user){
        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            role:user.role,
            photo:user.photo,
            bio:user.bio,
            isVerified:user.isVerified,
            token : token
        })
    }else{
        res.status(400).json({message:"Invalid user data"})
    }
})

export const loginUser=asyncHandler(async(req,res)=>{

    const [email,password]=req.body;

    if(!email || !password){
        res.status(400).json({message:"Please add all fields"})
    }

    const userExists=await User.findOne({email});

    if(!userExists) return res.status(400).json({message:"User does not exist,sign up!"});

    const isMatch=await bcrypt.compare(password,userExists.password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token=generateToken(userExists._id);

    if(userExists && isMatch){
        res.cookie("token",token,{httpOnly:true,
            path:'/',
            maxAge:30*24*60*60*1000,
            sameSite:true,
            secure:true
        });

        res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            role:userExists.role,
            photo:userExists.photo,
            bio:userExists.bio,
            isVerified:userExists.isVerified,
            token : token
        })
    }
        else{
            res.status(400).json({message:"Invalid user data"})
        }
    

})