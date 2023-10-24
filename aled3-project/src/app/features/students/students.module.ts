import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StudentTableComponent } from './student-table/student-table.component'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { EditStudentComponent } from './edit-student/edit-student.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const studentRoutes: Routes = [
  { path: '', component: StudentTableComponent },
  { path: 'edit/:id', component: EditStudentComponent }
]

@NgModule({
  declarations: [StudentTableComponent, EditStudentComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(studentRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentsModule {}
