import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {
  transform (value: boolean, ...args: unknown[]): string {
    let state = ''
    value === true ? (state = 'activo') : (state = 'inactivo')
    return state
  }
}
