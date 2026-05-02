import { verifyToken } from "../lib/verifyToken.js";

export const verifyUser = (req, res, next) => {
    try{
        const token = req.cookies.token; // Get token from cookies
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        } 
        const payload = verifyToken(token);
        if (payload === null) {
            return res.status(401).json({ success: false, message: 'Unauthorized key' });
        }  
        req.user = { _id: payload._id, name: payload.name };
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};