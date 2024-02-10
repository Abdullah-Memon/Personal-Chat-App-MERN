import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import token from "../utility/generate.token.js";

export const signup = async(req,res)=>{
    try {
        const {new_fullname, new_username, new_password, new_confirmPassword, new_gender} = req.body;

        if(new_password.length < 6) {
            return res.status(400).json({error: "Password must be atleast 6 characters long"});
        }

        // Passwords Verification
        if(new_password !== new_confirmPassword)
        {
            return res.status (400).json({error: "Password do not match"});
        }

        // Username Verification to avoid duplication
        const user = await User.findOne({username: new_username});
        if(user) {
            return res.status(400).json({error: "Username already exist"})
        }
        
        // Hash Password
        const salt = await bycrypt.genSalt(10);
        const new_passwordHash = await bycrypt.hash(new_password, salt);

        // Random profile picture from other API ( https://avatar.iran.liara.run/public/<gender>?username=<username>)
        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${new_username}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${new_username}`;

        // Combining all the data using user module:
        const new_User = new User({
            fullname: new_fullname,
            username: new_username,
            password: new_passwordHash,
            gender: new_gender,
            profile : new_gender === "male" ? boyProfile:girlProfile
        })

        if(new_User){
            //Generate Token
            token(new_User, res);
            // Save User
            await new_User.save();
            return res.status(201).json({message:"User Created Successfully"});
        }

    } catch (error) {
        console.log("Error in Signup Controller: ", error.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
};


export const login = async(req,res)=>{
    try {
        const {username, password} = req.body;

        // Verify User information
        const user = await User.findOne({username});

        // after || (""), it is necesssary because if user is not found, then it will return null and null is not a string
        const isPasswordMatch = await bycrypt.compare(password, user?.password || "");

        if(!user || !isPasswordMatch){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        token(user._id, res);

        // 200 status referst to "OK"
        res.status(200).json({message:"User Logged In Successfully", id: user._id});


    } catch (error) {
        console.log("Error in Login Controller: ", error.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
};


export const logout = (req,res)=>{
    
    try {
        res.clearCookie("jwt");
        res.status(200).json({message:"User Logged Out Successfully"});
    } catch (error) {
        console.log("Error in Logout Controller: ", error.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
};
