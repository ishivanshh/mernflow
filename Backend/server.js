const http = require("http");
const app = require("./app");

const basePort = Number(process.env.PORT) || 3000;
const port = basePort;
const server = http.createServer(app);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    const fallbackPort = port + 1;
    console.warn(`Port ${port} is busy. Trying ${fallbackPort} instead...`);
    server.listen(fallbackPort, () => {
      console.log(`Server is running on port ${fallbackPort}`);
    });
    return;
  }

  console.error("Server error:", error);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

