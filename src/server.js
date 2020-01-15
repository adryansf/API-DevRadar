//Modules
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

//Database
require("./database");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
