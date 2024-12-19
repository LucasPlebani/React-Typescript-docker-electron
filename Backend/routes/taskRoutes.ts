import express from 'express';
import { createTask, getTasks, getOneTask, updateTask, deleteTask, toggleTaskCompletion } from '../controllers/taskController';

const router = express.Router();

// Route des tâches
router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getOneTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTaskCompletion);

export default router;