import { Injectable } from '@angular/core'
import { Student } from '../models/student.list'

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
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

  getStudents () {
    return this.studentList
  }

  getById () {}

  constructor () {}
}
