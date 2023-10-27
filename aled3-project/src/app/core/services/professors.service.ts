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
      surname: 'Belgrano',
      address: 'Belgrano 1043, Avellaneda, Buenos Aires, Argentina',
      birthDate: '1972-12-11',
      phone: 1164736559,
      email: 'manuel@itbeltran.com.ar'
    },
    {
      id: 2,
      active: true,
      name: 'Juan',
      surname: 'Perez',
      address: 'Córdoba 767, San Nicolás, Ciudad de Buenos Aires, Argentina',
      birthDate: '1977-06-27',
      phone: 1147565428,
      email: 'juan@itbeltran.com.ar'
    },
    {
      id: 3,
      active: true,
      name: 'Juana',
      surname: 'Romero Plaz',
      address: 'Bartolomé Mitre 23, Quilmes, Buenos Aires, Argentina',
      birthDate: '1968-06-27',
      phone: 1147989726,
      email: 'juana@itbeltran.com.ar'
    },
    {
      id: 4,
      active: true,
      name: 'Maria del Carmen',
      surname: 'Panon',
      address: 'Roma 34, Avellaneda, Buenos Aires, Argentina',
      birthDate: '1991-06-23',
      phone: 1125334698,
      email: 'mariadelcarmen@itbeltran.com.ar'
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
