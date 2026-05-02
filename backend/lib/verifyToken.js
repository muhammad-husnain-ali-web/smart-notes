import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch {
        return null;
    }
}