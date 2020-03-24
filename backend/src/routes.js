const express = require("express");
const routes = express.Router();
const ONGController = require("./controllers/ONGController")
const IncidentController = require("./controllers/IncidentController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")

routes.post("/ong", ONGController.create);
routes.get("/ong", ONGController.index);

routes.get("/profile", ProfileController.index);

routes.post("/session", SessionController.create);

routes.post("/incident", IncidentController.create);
routes.get("/incident", IncidentController.index);
routes.delete("/incident/:id", IncidentController.delete);

module.exports = routes;