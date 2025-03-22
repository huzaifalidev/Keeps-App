const taskModel = require("../models/taskModel");

const taskCreate = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    const newTask = new taskModel({
      title,
      description,
      userId: req.userId,
    });
    const taskSaved = await newTask.save();
    return res.status(201).json({
      message: "Task Saved Successfully",
      data: taskSaved,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const taskUpdate = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    const updates = req.body;
    const taskId = req.params.taskId;
    const updatedTask = await taskModel.findOneAndUpdate(
      { userId: req.userId, taskId },
      updates,
      {
        new: true,
      }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: `${updatedTask.taskId} Task Successfully Updated`,
      updatedTask: updatedTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getAllTask = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    const allTasks = await taskModel.find({ userId: req.userId });
    if (!allTasks) {
      return res.status(404).json({ message: "Tasks Not Found" });
    }
    return res.status(200).json({
      message: "All Tasks Successfully Fetched!",
      tasks: allTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    const taskId = req.params.taskId;
    const deletedTask = await taskModel.findOneAndDelete({
      userId: req.userId,
      taskId: taskId,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    return res.status(200).json({
      message: `Task Successfully Deleted`,
      deletedTask: deletedTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const searchTask = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    const taskId = req.params.taskId;
    const searchedTask = await taskModel.findOne({
      userId: req.userId,
      taskId: taskId,
    });
    if (!searchedTask) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    return res.status(200).json({
      message: `${searchedTask.taskId} Task Successfully Found`,
      task: searchedTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = { taskCreate, taskUpdate, getAllTask, searchTask, deleteTask };
