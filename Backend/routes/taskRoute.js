const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  taskCreate,
  taskUpdate,
  getAllTask,
  searchTask,
  deleteTask,
} = require("../controllers/taskController");
router.post("/task", authMiddleware, taskCreate);
router.put("/task/:taskId", authMiddleware, taskUpdate);
router.get("/Alltask", authMiddleware, getAllTask);
router.get("/task/:taskId", authMiddleware, searchTask);
router.delete("/task/:taskId", authMiddleware, deleteTask);
module.exports = router;
