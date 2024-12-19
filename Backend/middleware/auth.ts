import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModels';

interface DecodedToken {
    userId: string;
}

interface AuthRequest extends Request {
    auth?: {
        userId: string;
    };
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log('Token reçu:', token); // Log pour debug

        if (!token) {
            throw new Error('Token manquant');
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as DecodedToken;
        console.log('Token décodé:', decodedToken); // Log pour debug
        
        const userId = decodedToken.userId;
        
        // Vérifier si le token existe dans la base de données
        const user = await User.findOne({ _id: userId, token: token });
        console.log('Utilisateur trouvé:', user ? 'Oui' : 'Non'); // Log pour debug
        
        if (!user) {
            throw new Error('Token invalide ou expiré');
        }
        
        req.auth = { userId };
        next();
    } catch (error) {
        console.error('Erreur d\'authentification:', error); // Log pour debug
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};

export default auth;