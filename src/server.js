//Modules
const express = require("express");
const routes = require("./routes");

const app = express();

//Database
require("./database");

app.get("/", (req, res) => {
  return res.json({ ok: true });
});

//Middlewares
app.use(express.json());
app.use(routes);

app.listen(3333);
