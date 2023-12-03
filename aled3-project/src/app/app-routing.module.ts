import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginGuard } from './core/guards/login.guard'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'students',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./features/students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'courses',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./features/courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'professors',
    canActivate: [LoginGuard],
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
