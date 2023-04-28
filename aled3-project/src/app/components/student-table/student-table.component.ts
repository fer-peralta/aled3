import { Component } from '@angular/core'
import { Student } from 'src/app/models/student.list'

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  studentList: Student[] = [
    {
      id: 1,
      name: 'Fernando',
      surname: 'Peralta'
    },
    {
      id: 2,
      name: 'Benjamín',
      surname: 'Peralta'
    }
  ]
}
