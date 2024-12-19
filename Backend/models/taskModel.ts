import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Interface pour les tâches
interface ITask {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    userId: string;
}

// Schéma Mongoose pour les tâches
const taskSchema = new mongoose.Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    }
});

// Fonction pour créer une tâche
const createTask = async (taskData: Partial<ITask>): Promise<void> => {
    try {
        const task = new Task(taskData);
        await task.save();
        console.log('Tâche créée avec succès');
    } catch (error) {
        console.error('Erreur lors de la création de la tâche:', error);
    }
};

// Fonction pour obtenir toutes les tâches
const getAllTasks = async (): Promise<ITask[]> => {
    try {
        const tasks = await Task.find();
        return tasks;
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        return [];
    }
};

// Fonction pour mettre à jour une tâche
const updateTask = async (id: string, updateData: Partial<ITask>): Promise<void> => {
    try {
        await Task.findByIdAndUpdate(id, updateData);
        console.log('Tâche mise à jour avec succès');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
};

// Fonction pour supprimer une tâche
const deleteTask = async (id: string): Promise<void> => {
    try {
        await Task.findByIdAndDelete(id);
        console.log('Tâche supprimée avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
    }
};

// Modèle Mongoose
const Task = mongoose.model<ITask>('Task', taskSchema);

export {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    Task,
    ITask
};
