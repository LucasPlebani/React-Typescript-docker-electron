import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
}

interface AuthRequest extends Request {
    auth?: {
        userId: string;
    };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Token manquant');
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as DecodedToken;
        const userId = decodedToken.userId;
        
        req.auth = { userId };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};

export default auth; 