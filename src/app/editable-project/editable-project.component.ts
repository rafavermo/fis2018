import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: '[app-editable-project]',
  templateUrl: './editable-project.component.html',
  styleUrls: ['./editable-project.component.css']
})
export class EditableProjectComponent implements OnInit {

  @Input() project: Project;
editable = false;

  constructor() { }

  onEdit() {
    this.editable = !this.editable;
  }
  ngOnInit() {
  }

}
