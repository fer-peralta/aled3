import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Professor } from 'src/app/core/models/professors.list'
import { ProfessorsService } from 'src/app/core/services/professors.service'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationsService } from 'src/app/core/services/notifications.service'

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent {
  editForm!: FormGroup
  sus?: Subscription
  professorId!: number
  professor: Professor | object = {}
  mode: 'create' | 'update' = 'create'

  constructor (
    private fb: FormBuilder,
    private _ProfessorsService: ProfessorsService,
    private _ActivatedRoute: ActivatedRoute,
    private route: Router,
    private _NotificationsService: NotificationsService
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', [Validators.required]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      numberOfStreet: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }

  ngOnInit () {
    this.professorId = parseInt(this._ActivatedRoute.snapshot.params['id'])
    if (this.professorId != 0) {
      this.sus = this._ProfessorsService
        .getProfessorById(this.professorId)
        .subscribe(data => {
          delete data.id
          delete data.active
          this.mode = 'update'
          const address = data.address.split(',')
          let street = address[0].split(' ')
          const streetNumber = street[street.length - 1]
          street.pop()
          const streetString = street.toString()
          const streetModified = streetString.replace(',', ' ')
          let object: any = data
          object.street = streetModified
          object.numberOfStreet = streetNumber
          object.city = address[1]
          object.province = address[2]
          object.country = address[3]
          delete object.address
          this.editForm.setValue(data)
        })
    }
  }

  professorEdit () {
    const form = this.editForm.value
    const address = `${form.street} ${form.numberOfStreet}, ${form.city}, ${form.province}, ${form.country}`
    delete form.street
    delete form.numberOfStreet
    delete form.city
    delete form.province
    delete form.country
    form.address = address
    const professor: Professor = form

    if (this.mode == 'create') {
      this._ProfessorsService.getProfessors().subscribe(data => {
        let lastValue = data[data.length - 1]
        let lastId = lastValue.id
        if (lastId !== undefined) {
          lastId++
          professor.id = lastId
        }
        professor.active = true
      })
      this.sus = this._ProfessorsService
        .addProfessor(professor)
        .subscribe(data => {
          this._NotificationsService.showNotification(
            'El profesor fue actualizado correctamente',
            'ok'
          )
          this.route.navigate(['/professors'])
        })
    } else if (this.mode == 'update') {
      this.sus = this._ProfessorsService
        .updateProfessor(this.professorId, professor)
        .subscribe(data => {
          professor.id = this.professorId
          this._NotificationsService.showNotification(
            'El profesor fue actualizado correctamente',
            'ok'
          )
        })
      this.route.navigate(['/professors'])
    }
  }

  ngOnDestroy () {
    if (this.sus) {
      this.sus.unsubscribe()
    }
  }
}
