import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  projects: Project[];
  selectedProject: Project;
  newProject: Project = {
    id:null,
    titulo:null,
    descripcion:null,
    fechaInicio:null,
    fechaFin:null,
    organismo:null,
    investigadorResponsable:null,
    investigadores:null,
    presupuesto:null,
    estado:null
  };

  constructor(private projectService: ProjectService) { }

  addProject() {
    this.projects.push(this.newProject);
    this.newProject = {
      id:null,
      titulo:null,
      descripcion:null,
      fechaInicio:null,
      fechaFin:null,
      organismo:null,
      investigadorResponsable:null,
      investigadores:null,
      presupuesto:null,
      estado:null
    }
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe((projects) => {
        this.projects = projects;
      });
  }
  ngOnInit() {
    this.getProjects();
  }

}
