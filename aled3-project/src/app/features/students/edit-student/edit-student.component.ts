import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Student } from 'src/app/core/models/student.list'
import { StudentsService } from 'src/app/core/services/students.service'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { NotificationsService } from 'src/app/core/services/notifications.service'

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  editForm!: FormGroup
  sus?: Subscription
  studentId!: number
  student: Student | object = {}
  mode: 'create' | 'update' = 'create'

  constructor (
    private fb: FormBuilder,
    private _StudentsService: StudentsService,
    private _ActivatedRoute: ActivatedRoute,
    private route: Router,
    private snackbar: MatSnackBar,
    private _NotificationsService: NotificationsService
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      course: ['', [Validators.required]],
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
    this.studentId = parseInt(this._ActivatedRoute.snapshot.params['id'])
    if (this.studentId != 0) {
      this.sus = this._StudentsService
        .getStudentById(this.studentId)
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

  studentEdit () {
    const form = this.editForm.value
    const address = `${form.street} ${form.numberOfStreet}, ${form.city}, ${form.province}, ${form.country}`
    delete form.street
    delete form.numberOfStreet
    delete form.city
    delete form.province
    delete form.country
    form.address = address
    const student: Student = form

    if (this.mode == 'create') {
      this._StudentsService.getStudents().subscribe(data => {
        let lastValue = data[data.length - 1]
        let lastId = lastValue.id
        if (lastId !== undefined) {
          lastId++
          student.id = lastId
        }
        student.active = true
      })
      this.sus = this._StudentsService.addStudent(student).subscribe(data => {
        this._NotificationsService.showNotification(
          'El estudiante fue ingresado correctamente',
          'ok'
        )
        this.route.navigate(['/students'])
      })
    } else if (this.mode == 'update') {
      this.sus = this._StudentsService
        .updateStudent(this.studentId, student)
        .subscribe(data => {
          student.id = this.studentId
          this._NotificationsService.showNotification(
            'El estudiante fue actualizado correctamente',
            'ok'
          )
        })
      this.route.navigate(['/students'])
    }
  }

  ngOnDestroy () {
    if (this.sus) {
      this.sus.unsubscribe()
    }
  }
}
