import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StudentTableComponent } from './components/student-table/student-table.component'
import { EditStudentComponent } from './components/edit-student/edit-student.component'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StudentTableComponent,
    EditStudentComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
