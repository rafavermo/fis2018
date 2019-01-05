import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditableProjectComponent } from './editable-project/editable-project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    EditableProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
