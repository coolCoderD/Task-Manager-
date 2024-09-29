import { Router } from "express";
import express from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/tasks/tasksController.js";
import { protect } from "../middleware/authMiddleware.js";

const taskRouter=express.Router();

taskRouter.post('/task/create',protect,createTask);
taskRouter.get("/task/:id",protect,getTask);
taskRouter.get("/tasks",protect,getTasks);
taskRouter.patch("/task/:id",protect,updateTask);
taskRouter.delete("/task/:id",protect,deleteTask);

export default taskRouter