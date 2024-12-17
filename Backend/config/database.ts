import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Configurer dotenv avec le chemin correct vers le fichier .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const connectDB = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error('MONGODB_URL is not defined in environment variables');
        }
        
        console.log('Trying to connect with URL:', mongoUrl); // Debug log
        
        await mongoose.connect(mongoUrl);
        console.log('MongoDB connecté avec succès');
    } catch (error) {
        console.error('Erreur de connexion MongoDB:', error);
        process.exit(1);
    }
}; 