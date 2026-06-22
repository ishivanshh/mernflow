const http = require("http");
const app = require("./app");

const basePort = Number(process.env.PORT) || 3000;
const port = basePort;
const server = http.createServer(app);
const { initializeSocket } = require("./socket");

initializeSocket(server);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Please stop the process using it or set PORT to another port.`);
    process.exit(1);
  }

  console.error("Server error:", error);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server shutting down...");
    process.exit(0);
  });
});

process.once("SIGUSR2", () => {
  server.close(() => {
    process.kill(process.pid, "SIGUSR2");
  });
});

