import { Component } from '@angular/core'
import { Student } from 'src/app/models/student.list'

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  tableHead: Array<String> = ['ID', 'Name', 'Surname', 'Subject', 'Note']

  studentList: Array<Student> = [
    {
      id: 1,
      name: 'Fernando',
      surname: 'Peralta',
      subject: 'Algoritmo III',
      note: 8
    },
    {
      id: 2,
      name: 'Benjamín',
      surname: 'Peralta',
      subject: 'Ingeniería de software II',
      note: 10
    }
  ]
}
