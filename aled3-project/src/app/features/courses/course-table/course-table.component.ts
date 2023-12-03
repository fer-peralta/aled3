import { Component, OnInit, ViewChild } from '@angular/core'
import { Course } from 'src/app/core/models/course.list'
import { CoursesService } from 'src/app/core/services/courses.service'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  courseList!: Array<Course>

  displayedColumns: string[] = [
    'ID',
    'Name',
    'Professor',
    'Carrer',
    'YearOfTheCarrer',
    'HoursPerWeek',
    'active',
    'actions'
  ]
  sus?: Subscription
  dataSource!: any

  constructor (private _CoursesService: CoursesService) {}

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
    this._CoursesService.getCourses().subscribe(data => {
      this.courseList = data
      this.dataSource = new MatTableDataSource<Course>(this.courseList)
    })
  }
  deleteCourse (id: number) {
    this.sus = this._CoursesService.deleteCourse(id).subscribe(data => {
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
