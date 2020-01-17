//Modules
const express = require("express");
const routes = require("./routes");
const http = require("http");
const cors = require("cors");
const { setupWebSocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebSocket(server);

//Database
require("./database");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
