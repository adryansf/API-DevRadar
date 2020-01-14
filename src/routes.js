const { Router } = require("express");

const routes = Router();

//Controllers
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

//Routes: Dev
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.put("/devs/:id", DevController.update);
routes.delete("/devs/:id", DevController.destroy);

//Routes: Search
routes.get("/search", SearchController.index);

module.exports = routes;
