import bcrypt from "bcryptjs";
import Users from '../models/Users.js';

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