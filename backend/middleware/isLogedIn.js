import jwt from "jsonwebtoken";
import user from "../models/Signup.js";

import dotenv from "dotenv";

dotenv.config();

const secret=process.env.SECRET

const isLoggedIn = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Not logged in" });
      }
      const decoded = jwt.verify(token, secret || "defaultsecret");
      const loggedInUser = await user.findOne({ email: decoded.email });
      if (!loggedInUser) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = loggedInUser; 
      next();

    } catch (error) {
      res.status(401).json({ message: "Unauthorized", error: error.message });
    }
  };

export default isLoggedIn
