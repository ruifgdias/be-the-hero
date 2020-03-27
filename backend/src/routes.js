const express = require("express");
const { celebrate, Segments, Joi  } = require('celebrate')
const routes = express.Router();
const ONGController = require("./controllers/ONGController")
const IncidentController = require("./controllers/IncidentController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")

routes.post("/ong", celebrate({
    [Segments.BODY] :Joi.object().keys({
        name : Joi.string().required(),
        email: Joi.string().email(),
        whatsapp: Joi.string().required().max(13),
        city: Joi.string().required(),
        uf: Joi.string().max(2)
    })
}), ONGController.create);

routes.get("/ong", ONGController.index);

routes.get("/profile", celebrate({
    [Segments.HEADERS] : Joi.object().keys({
        authorization: Joi.string().required()
    }).options({ allowUnknown: true })
}) , ProfileController.index);

routes.post("/session", SessionController.create);

routes.post("/incident", IncidentController.create);

routes.get("/incident", celebrate({
    [Segments.QUERY] : {
        page : Joi.number(),
        pagesize : Joi.number()
    }
}), IncidentController.index);

routes.delete("/incident/:id", celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id : Joi.number().required()
    })
}), IncidentController.delete);

module.exports = routes;