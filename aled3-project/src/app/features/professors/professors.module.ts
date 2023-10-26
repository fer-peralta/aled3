import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfessorTableComponent } from './professor-table/professor-table.component'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { EditProfessorComponent } from './edit-professor/edit-professor.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const professorRoutes: Routes = [
  { path: 'professors', component: ProfessorTableComponent },
  { path: 'professors/edit/:id', component: EditProfessorComponent }
]

@NgModule({
  declarations: [ProfessorTableComponent, EditProfessorComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(professorRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfessorsModule {}
