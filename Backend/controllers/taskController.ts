import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/taskModel';
import User from '../models/userModels';

interface AuthRequest extends Request {
    auth?: {
        userId: string;
    };
}

// Créer une nouvelle tâche
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Trouver l'utilisateur avec un token valide
        const user = await User.findOne({ token: { $ne: null } }).sort({ _id: -1 });
        
        if (!user) {
            res.status(401).json({ error: 'Aucun utilisateur connecté trouvé' });
            return;
        }

        // Créer la tâche
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            userId: user._id
        });

        await task.save();
        res.status(201).json({ 
            message: 'Tâche créée !',
            task,
            token: user.token
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Récupérer toutes les tâches d'un utilisateur
export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Trouver l'utilisateur avec un token valide
        const user = await User.findOne({ token: { $ne: null } }).sort({ _id: -1 });
        
        if (!user) {
            res.status(401).json({ error: 'Aucun utilisateur connecté trouvé' });
            return;
        }

        const tasks = await Task.find({ userId: user._id });
        res.status(200).json({
            tasks,
            token: user.token
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Récupérer une tâche spécifique
export const getOneTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Trouver l'utilisateur avec un token valide
        const user = await User.findOne({ token: { $ne: null } }).sort({ _id: -1 });
        
        if (!user) {
            res.status(401).json({ error: 'Aucun utilisateur connecté trouvé' });
            return;
        }

        const task = await Task.findOne({ _id: req.params.id, userId: user._id });
        if (!task) {
            res.status(404).json({ message: 'Tâche non trouvée !' });
            return;
        }
        
        res.status(200).json({
            task,
            token: user.token
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Modifier une tâche
export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Trouver l'utilisateur avec un token valide
        const user = await User.findOne({ token: { $ne: null } }).sort({ _id: -1 });
        
        if (!user) {
            res.status(401).json({ error: 'Aucun utilisateur connecté trouvé' });
            return;
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: user._id },
            { ...req.body },
            { new: true }
        );
        
        if (!task) {
            res.status(404).json({ message: 'Tâche non trouvée !' });
            return;
        }
        
        res.status(200).json({ 
            message: 'Tâche modifiée !', 
            task,
            token: user.token 
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Supprimer une tâche
export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Trouver l'utilisateur avec un token valide
        const user = await User.findOne({ token: { $ne: null } }).sort({ _id: -1 });
        
        if (!user) {
            res.status(401).json({ error: 'Aucun utilisateur connecté trouvé' });
            return;
        }

        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: user._id });
        
        if (!task) {
            res.status(404).json({ message: 'Tâche non trouvée !' });
            return;
        }
        
        res.status(200).json({ 
            message: 'Tâche supprimée !',
            token: user.token
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Marquer une tâche comme complétée/non complétée
export const toggleTaskCompletion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Trouver l'utilisateur avec un token valide
        const user = await User.findOne({ token: { $ne: null } }).sort({ _id: -1 });
        
        if (!user) {
            res.status(401).json({ error: 'Aucun utilisateur connecté trouvé' });
            return;
        }

        const task = await Task.findOne({ _id: req.params.id, userId: user._id });
        
        if (!task) {
            res.status(404).json({ message: 'Tâche non trouvée !' });
            return;
        }
        
        task.completed = !task.completed;
        await task.save();
        
        res.status(200).json({ 
            message: 'Statut de la tâche modifié !', 
            task,
            token: user.token
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}; 