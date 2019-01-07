var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    id: String,
    titulo: String,
    descripcion: String,
    fechaInicio: Date,
    fechaFin: Date,
    organismo: String,
    investigadorResponsable: String,
    investigadores: [String],
    presupuesto: String,
    estado: String
});

projectSchema.methods.cleanup = function() {
    return {
        id: this.id,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
        organismo: this.organismo,
        investigadorResponsable: this.investigadorResponsable,
        investigadores: this.investigadores,
        presupuesto: this.presupuesto,
        estado: this.estado
    };
}

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;