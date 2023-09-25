"use strict";
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;

// Count number of connections

const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections} `);
};

// Check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;

    const numCores = os.cpus().length; // Check number of CPU cores
    // RSS - Resident Set Size: refers to the amount of memory that the operating system has allocated to the current process and is currently resident in RAM
    // process.memoryUsage().rss :  monitor the memory consumption of Node.js application
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = numCores * 5;

    console.log(`Active connections: ${numConnections}`); // Check active connections
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`); // Check memory usage

    if (numConnections > maxConnections) {
      console.log(`Connection overload detected !`);
      // notify.send(....)
    }
  }, _SECONDS); // Monitor every 5 seconds
};

module.exports = {
  countConnect,
  checkOverload,
};
