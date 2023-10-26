import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Professor } from '../models/professors.list'

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {
  professorList: Array<Professor> = [
    {
      id: 1,
      active: true,
      name: 'Manuel',
      surname: 'Belgrano'
    },
    {
      id: 2,
      active: true,
      name: 'Juan',
      surname: 'Perez'
    }
  ]

  constructor () {}

  getProfessors (): Observable<Professor[]> {
    return of(this.professorList)
  }

  getProfessorById (id: number): Observable<Professor> {
    const professorById = this.professorList.find(e => e.id == id)
    if (!professorById) throw new Error('professor not found')
    return of({ ...professorById })
  }

  addProfessor (newProfessor: Professor): Observable<Professor[]> {
    this.professorList.push(newProfessor)
    return of([...this.professorList])
  }

  updateProfessor (
    id: number,
    updatedProfessor: Professor
  ): Observable<Professor[]> {
    updatedProfessor.active = true
    const index = this.professorList.findIndex(professor => professor.id === id)
    if (index !== -1) {
      this.professorList[index] = updatedProfessor
    }
    return of([...this.professorList])
  }

  deleteProfessor (professorId: number): Observable<Professor[]> {
    const index = this.professorList.findIndex(
      professor => professor.id === professorId
    )
    if (index !== -1) {
      this.professorList.splice(index, 1)
    } else {
      throw new Error('professor not found')
    }
    return of([...this.professorList])
  }
}
