var express = require('express');
var bodyParser = require('body-parser');
//var cors = require('cors');
//var path = require('path');
var BASE_URL = "api/v1";

console.log("Starting API server..");

var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {

});

/* Obtener todos los proyectos */
app.get(BASE_URL + "/proyects", (req, res) => {

});

/* Incluir un nuevo contacto*/
app.post(BASE_URL + "/proyects", (req, res) => {
    proyects.push(req.body);
    res.sendStatus(201);
});

app.listen(port);

console.log("Server Ready!");