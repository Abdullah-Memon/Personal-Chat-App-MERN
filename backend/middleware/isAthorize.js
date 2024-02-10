import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAthorize = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Check if user exists
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Set user in req.user
    req.user = user;

    // Call next function after successful execution
    next();
    
  } catch (error) {
    console.log("Error in Protect Route Middleware : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default isAthorize;
