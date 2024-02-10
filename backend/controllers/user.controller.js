import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const loggedinUser = req.user._id;

        // fetch all the users from data base except the logged in user
        const users = await User.find({_id:{ $ne: loggedinUser }}).select("-password");

        if(users) return res.status(200).json(users);
        else return res.status(404).json({ message: "No user found" });
        
    } catch (error) {
        console.log("Error in getUsers Controller: ", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}