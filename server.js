var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var Project = require('./projects');
var ApiKey = require('./apikeys');
var passport = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;

const PROJECT_APP_DIR = "/dist/projects-app";
var BASE_URL_API = "/api/v1";

passport.use(new LocalAPIKey(
    (apikey, done) => {
        ApiKey.findOne({ apikey: apikey }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Desconocida apikey ' + apikey });
            } else {
                console.log("Logado como: " + user.user);
                return done(null, user);
            }
        });
    }
));

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use(express.static(path.join(__dirname, PROJECT_APP_DIR)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, PROJECT_APP_DIR, '/index.html'));
});

/* Obtener todos los proyectos */
app.get(BASE_URL_API + "/projects",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        console.log(Date() + " - GET /projects");
        Project.find({}, '-_id -__v', (err, projects) => {
            if (err) {
                console.error("Error al acceder a la base de datos");
                res.sendStatus(500);
            } else {
                res.send(projects.map((project) => {
                    return project.cleanup();
                }));
            }
        });
    });

/* Incluir un nuevo proyecto*/
app.post(BASE_URL_API + "/projects",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
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
app.put(BASE_URL_API + "/projects",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        console.log(Date() + " - PUT /projects");
        res.sendStatus(405);
    });

/* Eliminar un proyecto por nombre*/
app.delete(BASE_URL_API + "/projects/:name",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
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