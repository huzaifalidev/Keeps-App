const taskModel = require("../models/taskModel");

const taskCreate = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const newTask = new taskModel({ title, description });
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
    const updates = req.body;
    const taskId = req.params.taskId;
    const updatedTask = await taskModel.findOneAndUpdate({ taskId }, updates, {
      new: true,
    });
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
    const allTasks = await taskModel.find({});
    return res.status(200).json({
      message: "All Tasks are Successfully Fetched! ",
      Tasks: allTasks,
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
    const taskId = req.params.taskId;
    const searchedTask = await taskModel.findOneAndDelete({ taskId });
    return res.status(200).json({
      message: `${taskId} Task Successfully Deleted`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const searchTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const searchedTask = await taskModel.findOne({ taskId });
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
