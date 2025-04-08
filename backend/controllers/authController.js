import signup from "../models/Signup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET;
// const JWT_SECRET = process.env.JWT_SECRET


const signupUser = async (req, res) => {
    try {
        const { username, email, organization, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newSignUp = new signup({ username, email, organization, password: hashedPassword });
        await newSignUp.save();
        res.status(200).json({ message: "Employer Registered Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up user" });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newLogin = await signup.findOne({ email });
        if (!newLogin) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, newLogin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: newLogin._id }, SECRET);
        res.json({ token, newLogin });
    } catch (error) {
        res.status(500).json({ message: "Login Error" });
    }
};

const logoutUser = async (req, res) => {
    res.cookie("token", "");
    res.redirect('/home');
};

export default { signupUser, loginUser, logoutUser };

