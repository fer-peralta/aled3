import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './core/modules/material.module'
import { ToastService, AngularToastifyModule } from 'angular-toastify'
import { ProfessorTableComponent } from './features/professors/professor-table/professor-table.component'
import { EditProfessorComponent } from './features/professors/edit-professor/edit-professor.component'
import { CourseTableComponent } from './features/courses/course-table/course-table.component'
import { EditCourseComponent } from './features/courses/edit-course/edit-course.component'

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularToastifyModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {}
