require("dotenv").config();
const express = require("express");
const app = express();
const connectMongoDB = require("./connection");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
connectMongoDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// middleware
app.use(express.json());
app.use(cors());

const taskRoute = require("./routes/taskRoute");
app.use("/keeps/", taskRoute);
const userRoute = require("./routes/userRoute");
app.use("/keeps/users/", userRoute);

app.listen(PORT, () => console.log(`Server is Running on PORT: ${PORT}`));
