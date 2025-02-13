const mongoose = require("mongoose");
const mongoDB_URI = process.env.mongoDB_URI;
const collectionName = process.env.collectionName;
async function connectMongoDB() {
  try {
    mongoose.connect(`${mongoDB_URI}${collectionName}`);
    console.log("DataBase Connected!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectMongoDB;
