import { Injectable } from '@angular/core'
import { Student } from '../models/student.list'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  studentList: Array<Student> = [
    {
      id: 1,
      active: true,
      name: 'Fernando',
      surname: 'Peralta',
      subject: 'Algoritmos y estructuras de datos III',
      note: 8
    },
    {
      id: 2,
      active: true,
      name: 'Benjamín',
      surname: 'Peralta',
      subject: 'Ingeniería de software II',
      note: 10
    }
  ]

  constructor () {}

  getStudents (): Observable<Student[]> {
    return of(this.studentList)
  }

  getStudentById (id: number): Observable<Student> {
    const studentById = this.studentList.find(e => e.id == id)
    if (!studentById) throw new Error('user not found')
    return of({ ...studentById })
  }

  addStudent (newStudent: Student): Observable<Student[]> {
    this.studentList.push(newStudent)
    return of([...this.studentList])
  }

  updateStudent (id: number, updatedStudent: Student): Observable<Student[]> {
    updatedStudent.active = true
    const index = this.studentList.findIndex(student => student.id === id)
    if (index !== -1) {
      this.studentList[index] = updatedStudent
    }
    console.log(this.studentList)
    return of([...this.studentList])
  }

  deleteStudent (studentId: number): Observable<Student[]> {
    const index = this.studentList.findIndex(
      student => student.id === studentId
    )
    if (index !== -1) {
      this.studentList.splice(index, 1)
    } else {
      throw new Error('student not found')
    }
    return of([...this.studentList])
  }
}
