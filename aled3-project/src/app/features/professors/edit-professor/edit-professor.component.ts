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
      surname: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  ngOnInit () {
    this.professorId = parseInt(this._ActivatedRoute.snapshot.params['id'])
    if (this.professorId != 0) {
      this.sus = this._ProfessorsService
        .getProfessorById(this.professorId)
        .subscribe(res => {
          delete res.id
          delete res.active
          this.mode = 'update'
          this.editForm.setValue(res)
        })
    }
  }

  professorEdit () {
    const professor: Professor = this.editForm.value
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
