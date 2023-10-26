import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CourseTableComponent } from './course-table/course-table.component'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { EditCourseComponent } from './edit-course/edit-course.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const courseRoutes: Routes = [
  { path: 'courses', component: CourseTableComponent },
  { path: 'courses/edit/:id', component: EditCourseComponent }
]

@NgModule({
  declarations: [CourseTableComponent, EditCourseComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(courseRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule {}
