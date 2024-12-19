import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModels';

interface AuthRequest extends Request {
        auth?: {
            userId: string;
        };
    }

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        });
        
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé !' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json({ error: 'Utilisateur non trouvé !' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(401).json({ error: 'Mot de passe incorrect !' });
            return;
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || '',
            { expiresIn: '24h' }
        );

        // Sauvegarder le token dans la base de données
        user.token = token;
        await user.save();

        res.status(200).json({
            userId: user._id,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.auth?.userId);
        if (user) {
            user.token = null;
            await user.save();
        }
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ error });
    }
};