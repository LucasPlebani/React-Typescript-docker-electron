import express from 'express';
import { createTask, getTasks, getOneTask, updateTask, deleteTask, toggleTaskCompletion } from "../controllers/taskController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/", createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getOneTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id/toggle", authMiddleware, toggleTaskCompletion);

export default router;