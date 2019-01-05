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
    name: null,
    dateIni: null,
    dateFin: null,
    description: null,
    status: null
  };

  constructor(private projectService: ProjectService) { }

  addProject() {
    this.projects.push(this.newProject);
    this.newProject = {
      name: null,
      description: null,
      dateIni: null,
      dateFin: null,
      status: null
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
