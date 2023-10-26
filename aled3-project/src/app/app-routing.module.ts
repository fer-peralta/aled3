import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/students/students.module').then(m => m.StudentsModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/professors/professors.module').then(
        m => m.ProfessorsModule
      )
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
