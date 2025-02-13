const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    unique: true,
    default: function Id() {
      const randomNumber = Math.random() * 1000;
      const ceilNumber = Math.ceil(randomNumber);
      return ceilNumber;
    },
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  submittedTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
