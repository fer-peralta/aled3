import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Course } from '../models/course.list'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseList: Array<Course> = [
    {
      id: 1,
      active: true,
      name: 'Inglés III',
      professor: 'Juan Perez',
      carrer: 'Análisis de sistemas'
    },
    {
      id: 2,
      active: true,
      name: 'Análisis matemático II',
      professor: 'Juan Perez',
      carrer: 'Análisis de sistemas'
    }
  ]

  constructor () {}

  getCourses (): Observable<Course[]> {
    return of(this.courseList)
  }

  getCourseById (id: number): Observable<Course> {
    const courseById = this.courseList.find(e => e.id == id)
    if (!courseById) throw new Error('course not found')
    return of({ ...courseById })
  }

  addCourse (newCourse: Course): Observable<Course[]> {
    this.courseList.push(newCourse)
    return of([...this.courseList])
  }

  updateCourse (id: number, updatedCourse: Course): Observable<Course[]> {
    updatedCourse.active = true
    const index = this.courseList.findIndex(course => course.id === id)
    if (index !== -1) {
      this.courseList[index] = updatedCourse
    }
    console.log(this.courseList)
    return of([...this.courseList])
  }

  deleteCourse (courseId: number): Observable<Course[]> {
    const index = this.courseList.findIndex(course => course.id === courseId)
    if (index !== -1) {
      this.courseList.splice(index, 1)
    } else {
      throw new Error('course not found')
    }
    return of([...this.courseList])
  }
}
