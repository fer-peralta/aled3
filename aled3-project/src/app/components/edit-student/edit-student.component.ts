import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  editForm!: FormGroup

  constructor (private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: [''],
      surname: [''],
      subject: [''],
      note: ['']
    })
  }

  studentEdit () {
    console.log(this.editForm)
  }
}
