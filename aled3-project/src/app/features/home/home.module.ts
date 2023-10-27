import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { HomeComponent } from './home.component'

const professorRoutes: Routes = [{ path: '', component: HomeComponent }]

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(professorRoutes)]
})
export class HomeModule {}
