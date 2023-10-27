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
      course: 'Algoritmos y estructuras de datos III',
      address: 'San Martin 1816, Florencio Varela, Buenos Aires, Argentina',
      birthDate: '2005-03-25',
      phone: 1122334455,
      email: 'fernando@itbeltran.com.ar'
    },
    {
      id: 2,
      active: true,
      name: 'Benjamín',
      surname: 'Peralta',
      course: 'Ingeniería de software II',
      address:
        'Manuel Belgrano 1810, Florencio Varela, Buenos Aires, Argentina',
      birthDate: '2000-02-02',
      phone: 1132454563,
      email: 'benjamin@itbeltran.com.ar'
    },
    {
      id: 3,
      active: true,
      name: 'Ricardo',
      surname: 'Sarmiento',
      course: 'Inglés III',
      address: 'Bartolomé Mitre 23, Avellaneda, Buenos Aires, Argentina',
      birthDate: '2002-05-02',
      phone: 1157964527,
      email: 'ricardo@itbeltran.com.ar'
    },
    {
      id: 4,
      active: true,
      name: 'Julia',
      surname: 'Akira',
      course: 'Algoritmos y estructuras de datos III',
      address: 'Santa Fe 2001, Recoleta, Ciudad de Buenos Aires, Argentina',
      birthDate: '2007-12-12',
      phone: 1146474843,
      email: 'julia@itbeltran.com.ar'
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
