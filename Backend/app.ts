import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

// Configuration dotenv
dotenv.config();

const app = express();

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // * pour que tous puisse acceder a l'api 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    // Répondre aux requêtes OPTIONS avec un statut 200 OK
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // __dirname enregistre et actualise l'appli dans le navigateur

export default app;