import { Component, OnInit, ViewChild } from '@angular/core'
import { Student } from 'src/app/core/models/student.list'
import { StudentsService } from 'src/app/core/services/students.service'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  studentList!: Array<Student>

  displayedColumns: string[] = [
    'ID',
    'Name',
    'Surname',
    'Course',
    'BirthDate',
    'Address',
    'Phone',
    'Email',
    'active',
    'actions'
  ]
  sus?: Subscription
  dataSource!: any

  constructor (private _StudentsService: StudentsService) {}

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
    this._StudentsService.getStudents().subscribe(data => {
      this.studentList = data
      this.dataSource = new MatTableDataSource<Student>(this.studentList)
    })
  }

  deleteStudent (id: number) {
    this.sus = this._StudentsService.deleteStudent(id).subscribe(data => {
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
