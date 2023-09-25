const app = require("./src/app");
const {
  app: { port },
} = require("./src/configs/config.mongodb");

const PORT = port || 5000;

const server = app.listen(5000, () => {
  console.log("Service eCommerce start at port ", PORT);
});

// SIGINT = Ctrl + C
process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express"));
  //   notify.send(ping...)
});
