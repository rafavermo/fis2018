var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    name: String,
    dateIni: Date,
    dateFin: Date,
    status: String,
    description: String
});

projectSchema.methods.cleanup = function() {
    return {
        name: this.name,
        dateIni: this.dateIni,
        dateFin: this.dateFin,
        status: this.status,
        description: this.description
    };
}

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;