const express = require("express");
const router = express.Router();
const {
  taskCreate,
  taskUpdate,
  getAllTask,
  searchTask,
  deleteTask,
} = require("../controllers/taskController");
router.post("/taskCreate", taskCreate);
router.put("/taskUpdate/:taskId", taskUpdate);
router.get("/allTasks/", getAllTask);
router.get("/searchTask/:taskId", searchTask);
router.delete("/deleteTask/:taskId", deleteTask);
module.exports = router;
