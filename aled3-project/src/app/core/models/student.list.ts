// import type { Subject } from './course.list'
export interface Student {
  id?: number
  active?: boolean
  name: String
  surname: String
  subject: Subject
  note: Number
}

export type Subject =
  | 'Algoritmos y estructuras de datos III'
  | 'Ingeniería de software II'
  | 'Inglés III'
  | 'Prácticas profesionalizantes III'
  | 'Aspectos legales de la profesión'
  | 'Seminario de actualización'
  | 'Redes y comunicaciones'
