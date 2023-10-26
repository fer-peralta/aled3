export interface Course {
  id?: number
  active?: boolean
  name: String
  professor: Professor
  carrer: Carrer
}

export type Professor = 'Juan Perez' | 'Maria Rodriguez'

export type Carrer = 'Análisis de sistemas' | 'Seguridad e higiene'
