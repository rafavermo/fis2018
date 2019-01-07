var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var Project = require('../projects');
var ApiKey = require('../apikeys');
var expect = chai.expect;

chai.use(chaiHttp);


describe('Project API', () => {

    before(() => {
        var ApiKeyStub = sinon.stub(ApiKey, 'findOne');
        ApiKeyStub.yields(null, new ApiKey({ user: "test" }));
    });


    describe('GET /', () => {
        it('should return HTML', (done) => {
            chai.request(server.app)
                .get('/')
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });
    });

    describe('GET /projects', () => {
        var project = new Project({
            id: '1',
            titulo: "Test",
            descripcion: "Descripcion",
            fechaInicio: new Date(),
            fechaFin: new Date(),
            organismo: "organismo",
            investigadorResponsable: "1",
            investigadores: ["1", "3"],
            presupuesto: "2",
            estado: "concedido"
        });
        var projectMock = sinon.mock(project);
        projectMock.expects('cleanup').returns({
            id: '1',
            titulo: "Test",
            descripcion: "Descripcion",
            fechaInicio: new Date(),
            fechaFin: new Date(),
            organismo: "organismo",
            investigadorResponsable: "1",
            investigadores: ["1", "3"],
            presupuesto: "2",
            estado: "concedido"
        });

        var ProjectFindStub = sinon.stub(Project, 'find');
        ProjectFindStub.yields(null, [project]);

        it('should return all projects', (done) => {
            chai.request(server.app)
                .get('/api/v1/projects')
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    projectMock.verify();
                    done();
                });
        });
    });

    describe('POST /projects', () => {
        it('should create a new project', (done) => {
            var project = {
                id: '1',
                titulo: "Test",
                descripcion: "Descripcion",
                fechaInicio: new Date(),
                fechaFin: new Date(),
                organismo: "organismo",
                investigadorResponsable: "1",
                investigadores: ["1", "3"],
                presupuesto: "2",
                estado: "concedido"
            };

            var dbMock = sinon.mock(Project);
            dbMock.expects('create').withArgs(project).yields(null);

            chai.request(server.app)
                .post('/api/v1/projects')
                .query({ apikey: "test" })
                .send(project)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    dbMock.verify();
                    done();
                });

        });
    });

    describe('POST /projects', () => {
        it('should return 500 if fails', (done) => {
            var project = { "name": "jaime", "phone": 1111 };
            var dbMock = sinon.mock(Project);
            dbMock.expects('create').withArgs(project).yields(true);

            chai.request(server.app)
                .post('/api/v1/projetcs')
                .send(project)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    dbMock.verify();
                    done();
                });
        });
    });
});