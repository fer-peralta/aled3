import { Component } from '@angular/core'
import { Student } from 'src/app/models/student.list'
import { StudentsService } from 'src/app/services/students.service'

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  tableHead: Array<String> = ['ID', 'Name', 'Surname', 'Subject', 'Note']

  studentList!: Array<Student>

  constructor (private _studentsService: StudentsService) {}
  ngOnInit () {
    this.studentList = this._studentsService.getStudents()
  }
}
