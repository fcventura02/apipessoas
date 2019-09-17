const express = require('express');
const routes = express.Router();
const PersonController = require('./Controller/PersonController');

routes.get("/list", PersonController.index);
routes.get("/show/:id", PersonController.show);
routes.post("/add", PersonController.create);
routes.put("/update/:id", PersonController.update);
routes.delete("/del/:id", PersonController.remove);

module.exports = routes;