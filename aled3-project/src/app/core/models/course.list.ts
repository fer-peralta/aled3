export interface Course {
  id?: number
  active?: boolean
  name: String
  professor: Professor
  carrer: Carrer
  year: number
  hoursPerWeek: number
}

export type Professor =
  | 'Juan Perez'
  | 'Maria del Carmen Panon'
  | 'Juana Romero Plaz'
  | 'Manuel Belgrano'

export type Carrer = 'Análisis de sistemas' | 'Seguridad e higiene'
