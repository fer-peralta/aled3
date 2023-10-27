// import type { Subject } from './course.list'
export interface Student {
  id?: number
  active?: boolean
  name: String
  surname: String
  course: Course
  address: String
  birthDate: String
  phone: number
  email: String
}

export type Course =
  | 'Algoritmos y estructuras de datos III'
  | 'Ingeniería de software II'
  | 'Inglés III'
  | 'Prácticas profesionalizantes III'
  | 'Aspectos legales de la profesión'
  | 'Seminario de actualización'
  | 'Redes y comunicaciones'
