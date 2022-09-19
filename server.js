require("dotenv").config();
const http = require("http");

const { createApp } = require("./app");

const server = http.createServer(createApp());
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
