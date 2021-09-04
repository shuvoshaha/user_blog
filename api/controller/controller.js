import { userModel } from "../model/model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';

const router = express.Router();

// SIgn Up
export const registration = async (req, res) => {

    const { fname, lname, email, password, confirm_password } = req.body;

    try {
        const existUser = await userModel.findOne({ email });
        if (existUser) return res.json({ message: "Email alreay used" })

        const hashPassword = await bcrypt.hash(password, 12);
        const newUserInfo = { fname, lname, email, password: hashPassword }

        const newUser = new userModel(newUserInfo);
        if (password !== confirm_password) return res.json({ message: 'confrim password do not match' });
        const result = await newUser.save();
        res.status(201).json({ message: result });
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Sign In 
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isEmail = await userModel.findOne({ email })
        if (!isEmail) return res.status(500).json("Email is not exists")

        const isPasswordMatch = await bcrypt.compare(password, isEmail.password);
        if (isPasswordMatch) {
            // create token
            const token = jwt.sign({ email: isEmail.email, id: isEmail._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ result: isEmail.email, token });
        } else {
            return res.status(500).json({ message: "Email or Password doesn't match " });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}



export default router;