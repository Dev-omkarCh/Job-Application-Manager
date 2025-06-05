import bcryptJs from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/lib/generateToken.js";

export const getUser = async( req, res) =>{
    try{
        const user = await User.findById(req.user._id).select("-password");
        if(!user) return res.status(404).json({error: "User not found"});
        res.status(200).json(user);
    }
    catch(e){
        console.log("Error in getUser Controller", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signup = async( req, res) =>{
    try{
        const { fullName, email, password } = req.body;

        // Check if email is valid
        if(!fullName, !email, !password) return res.status(400).json({error: "Please fill in all fields"});

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) return res.status(400).json({error: "Invalid email"});


        // Check if email exists
        const existEmail = await User.findOne({ email });
        if(existEmail) return res.status(400).json({error: "This email already exists."});

        if(fullName.length < 2) return res.status(400).json({error: "FullName must be at least 2 characters."});
        if(password.length < 6) return res.status(400).json({error: "Password must be at least 6 characters."});

        // Hash password
        const salt = await bcryptJs.genSalt(10);
        const passwordHash = await bcryptJs.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName, email, password: passwordHash
        });

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id, 
                fullName: newUser.fullName,
                email: newUser.email,
            });
        }
        else{
            return res.status(400).json({msg: "Invalid credentials"});
        }
        
    }
    catch(e){
        console.log("Error in Signup Controller", e.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async( req, res) =>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const isCorrectPasswd = await bcryptJs.compare(password, user?.password || "");

        if(!user || !isCorrectPasswd) return res.status(400).json({error: "email or password is incorrect"});

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        });
    }
    catch(e){
        console.log("Error in Login Controller", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = ( req, res) =>{
    try{
        res.cookie("jwtToken", "", {maxAge: 0});
        res.status(200).json({msg: "Logged out successfully"});
    }
    catch(e){
        console.log("Error in Logout Controller", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
