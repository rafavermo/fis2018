
import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  serverUrl = "/api/v1";

  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<Project[]> {
    const url = this.serverUrl + "/projects";
    return this.httpClient.get<Project[]>(url);    
  }
}