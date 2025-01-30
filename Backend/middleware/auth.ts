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
        //Trouve le token
        const token = req.headers.authorization?.split(' ')[1];
        console.log('Token reçu:', token); 

        if (!token) {
            throw new Error('Token manquant');
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as DecodedToken;
        console.log('Token décodé:', decodedToken); 
        
        const userId = decodedToken.userId;
        
        // Vérifie si le token existe dans la base de données
        const user = await User.findOne({ _id: userId, token: token });
        console.log('Utilisateur trouvé:', user ? 'Oui' : 'Non'); 
        
        if (!user) {
            throw new Error('Token invalide ou expiré');
        }
        
        req.auth = { userId };
        next();
    } catch (error) {
        console.error('Erreur d\'authentification:', error); 
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};

export default auth;