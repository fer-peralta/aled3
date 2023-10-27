import { Component, OnInit, ViewChild } from '@angular/core'
import { Professor } from 'src/app/core/models/professors.list'
import { ProfessorsService } from 'src/app/core/services/professors.service'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-professor-table',
  templateUrl: './professor-table.component.html',
  styleUrls: ['./professor-table.component.css']
})
export class ProfessorTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  professorList!: Array<Professor>

  displayedColumns: string[] = [
    'ID',
    'Name',
    'Surname',
    'BirthDate',
    'Address',
    'Phone',
    'Email',
    'active',
    'actions'
  ]
  sus?: Subscription
  dataSource!: any

  constructor (private _ProfessorsService: ProfessorsService) {}

  ngAfterViewInit () {
    this.dataSource.paginator = this.paginator
  }

  active (activo: boolean) {
    if (activo) return 'activo'
    else return 'inactivo'
  }

  ngOnInit () {
    this.loadTable()
  }

  loadTable () {
    this._ProfessorsService.getProfessors().subscribe(data => {
      this.professorList = data
      this.dataSource = new MatTableDataSource<Professor>(this.professorList)
    })
  }

  deleteProfessor (id: number) {
    this.sus = this._ProfessorsService.deleteProfessor(id).subscribe(data => {
      this.loadTable()
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnDestroy () {
    if (this.sus) {
      this.sus.unsubscribe()
    }
  }
}
