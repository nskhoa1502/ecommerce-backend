"use strict";

const mongoose = require("mongoose");

const connectString = `mongodb://127.0.0.1:27017/shopDEV`;

const { countConnect } = require("../helpers/check.connect");

// Singleton pattern - Database Connection
class Database {
  constructor() {
    this.connect();
  }

  // Connect to database
  connect(type = "mongodb") {
    // Dev environment
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then((_) => {
        console.log(`Connected MongoDb`);
        countConnect();
      })
      .catch((err) => console.log("Error Connect!"));
  }

  // Check if Database instance has been initialized. Ensure only 1 connection is established
  static getInstance() {
    if (!Database.instance) {
      // Init a Database instance
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
