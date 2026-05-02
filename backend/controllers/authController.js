import bcrypt from "bcryptjs";
import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';
import {verifyToken} from '../lib/verifyToken.js';


// Function for user registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists!' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new Users({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password!' });
        }

        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
        });
        res.status(200).json({ success: true, message: 'Login successful!', user: { _id: user._id, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function for user logout
export const logoutUser = (req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ success: true, message: 'Logout successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to get user info
export const me = async (req, res) => {
    try{
        const token = req.cookies.token; // Get token from cookies
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized', auth: false, user: null });
        }

        const payload = verifyToken(token);
        if (payload === null) {
            return res.status(401).json({ success: false, message: 'Unauthorized key', auth: false, user: null });
        }

        res.status(200).json({ success: true, auth: true, user: { _id: payload._id, name: payload.name } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
