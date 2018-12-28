var server = require('./server');
let port = 3000;
mongoose.connect('mongodb://localhost/proyectos');
var db = mongoose.connect;
db.on('error', console.error.bind(console))
console.log("Starting API server...");

server.app.listen(port);

console.log("Server ready!");