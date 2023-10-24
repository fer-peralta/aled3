import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Student } from 'src/app/core/models/student.list'
import { StudentsService } from 'src/app/core/services/students.service'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'

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
    private route: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      subject: ['', [Validators.required]],
      note: ['', [Validators.required]]
    })
  }

  ngOnInit () {
    this.studentId = parseInt(this._ActivatedRoute.snapshot.params['id'])
    if (this.studentId != 0) {
      this.sus = this._StudentsService
        .getStudentById(this.studentId)
        .subscribe(res => {
          delete res.id
          delete res.active
          this.mode = 'update'
          this.editForm.setValue(res)
        })
    }
  }

  studentEdit () {
    const student: Student = this.editForm.value
    if (this.mode == 'create') {
      this.sus = this._StudentsService.addStudent(student).subscribe(data => {
        alert('estudiante creado correctamente')
        this.route.navigate(['/'])
      })
    } else if (this.mode == 'update') {
      this.sus = this._StudentsService
        .updateStudent(this.studentId, student)
        .subscribe(data => {
          alert('estudiante creado correctamente')
        })
    }
  }

  ngOnDestroy () {
    if (this.sus) {
      this.sus.unsubscribe()
    }
  }
}
