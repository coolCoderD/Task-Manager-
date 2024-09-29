import TaskModel from "../../models/tasks/tasks.js";
import asyncHandler from "express-async-handler";

export const createTask= asyncHandler(async(req,res)=>{
    const {title,description,dueDate,status,priority}=req.body;

    if (!title || title.trim() === "") {
        res.status(400).json({ message: "Title is required!" });
      }

    if (!description || description.trim() === "") {
        res.status(400).json({ message: "Description is required!" });
      }

    // Ensure that the task title is unique for the user
      const existingTask = await TaskModel.findOne({ title, user: req.user._id });
      if (existingTask) {
          return res.status(400).json({ message: "A task with this title already exists!" });
      }
  

    const task=await TaskModel.create({
        title,
        description,
        dueDate,
        status,
        priority,
        user:req.user._id
    })
    await task.save();


    if(task){
        return res.status(200).json({message:"Task created successfully",task});
    }
    else return res.status(400).json({message:"Task creation failed,try again!"});

})

export const getTasks=asyncHandler(async(req,res)=>{
    const userId=req.user._id;

    if(!userId) return res.status(404).json({message:"User not found"});

    const tasks=await TaskModel.find({user:userId});

    res.status(200).json({
        length:tasks.length,
        tasks,
    })
})

export const getTask=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const {id}=req.params;

    if(!id) return res.status(404).json({message:"Task not found,Please provide a task id"});
    const task=await TaskModel.findById(id);
    if(!task) return res.status(404).json({message:"Task not found"});

    if(!task.user.equals(userId)) return res.status(400).json({message:"Unauthorized access"});

    return res.status(200).json(task);
})

export const updateTask=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const {id}=req.params;
    if(!id) return res.status(404).json({message:"Task not found,Please provide a task id"});
    const task=await TaskModel.findById(id);
    if(!task) return res.status(404).json({message:"Task not found"});
    if(!task.user.equals(userId)) return res.status(400).json({message:"Unauthorized access"});

    const {title,description,dueDate,status,priority,completed}=req.body;

    task.title=title || task.title;
    task.description=description || task.description;
    task.dueDate=dueDate || task.dueDate;
    task.status=status || task.status;
    task.priority=priority || task.priority;
    task.completed=completed || task.completed;

    await task.save();
    return res.status(200).json({message:"Task updated successfully",task});

});

export const deleteTask=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const {id}=req.params;
    if(!id) return res.status(404).json({message:"Task not found,Please provide a task id"});
    const task=await TaskModel.findById(id);
    if(!task) return res.status(404).json({message:"Task not found"});
    if(!task.user.equals(userId)) return res.status(400).json({message:"Unauthorized access"});

    await TaskModel.findByIdAndDelete(id);
    return res.status(200).json({message:"Task deleted successfully"});
})

export const deleteAllTasks=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const tasks=await TaskModel.find({user:userId});
    
    if(!tasks) res.status(404).json({message:"No tasks found"});
    if(!tasks.user.equals(userId)) return res.status(400).json({message:"Unauthorized access"});
    await TaskModel.deleteMany({user:userId});
    return res.status(200).json({message:"All tasks deleted successfully"});
})