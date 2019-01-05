var express = require('express');
var bodyParser = require('body-parser');
var Project = require('./projects');
var cors = require('cors');
//var path = require('path');
var BASE_URL_API = "/api/v1";

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {

});

/* Obtener todos los proyectos */
app.get(BASE_URL_API + "/projects", (req, res) => {
    console.log(Date() + " - GET /projects");
    Project.find({}, '-_id -__v', (err, projects) => {
        if (err) {
            console.error("Error al acceder a la base de datos");
            res.sendStatus(500);
        } else {
            res.send(projects.map((project) => {
                return project;
            }));
        }
    });
});

/* Incluir un nuevo proyecto*/
app.post(BASE_URL_API + "/projects", (req, res) => {
    console.log(Date() + " - POST /projects");
    var project = new Project(req.body);
    project.save((err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

/* No permitido */
app.put(BASE_URL_API + "/projects", (req, res) => {
    console.log(Date() + " - PUT /projects");
    res.sendStatus(405);
});

/* Eliminar un proyecto por nombre*/
app.delete(BASE_URL_API + "/projects/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - DELETE /projects" + name);
    Project.deleteMany({ "name": name }, (err, numRemoved) => {
        if (err) {
            console.error("Error al acceder a la base de datos");
            res.sendStatus(500);
        } else {
            switch (numRemoved) {
                case 0:
                    res.sendStatus(404);
                    break;
                case 1:
                    res.sendStatus(200);
                    break;
                default:
                    console.warn("Incosistencia en DB: nombre duplicado");
                    break;
            }

        }
    });
});

module.exports.app = app;