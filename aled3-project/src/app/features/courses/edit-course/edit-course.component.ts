import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Course } from 'src/app/core/models/course.list'
import { CoursesService } from 'src/app/core/services/courses.service'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {
  editForm!: FormGroup
  sus?: Subscription
  courseId!: number
  course: Course | object = {}
  mode: 'create' | 'update' = 'create'

  constructor (
    private fb: FormBuilder,
    private _CoursesService: CoursesService,
    private _ActivatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      professor: ['', [Validators.required, Validators.minLength(2)]],
      carrer: ['', [Validators.required, Validators.minLength(2)]]
    })
  }
  ngOnInit () {
    this.courseId = parseInt(this._ActivatedRoute.snapshot.params['id'])
    if (this.courseId != 0) {
      this.sus = this._CoursesService
        .getCourseById(this.courseId)
        .subscribe(res => {
          delete res.id
          delete res.active
          this.mode = 'update'
          this.editForm.setValue(res)
        })
    }
  }
  courseEdit () {
    const course: Course = this.editForm.value
    if (this.mode == 'create') {
      this._CoursesService.getCourses().subscribe(data => {
        let lastValue = data[data.length - 1]
        let lastId = lastValue.id
        if (lastId !== undefined) {
          lastId++
          course.id = lastId
        }
        course.active = true
      })
      this.sus = this._CoursesService.addCourse(course).subscribe(data => {
        alert('curso creado correctamente')
        this.route.navigate(['/students'])
      })
    } else if (this.mode == 'update') {
      this.sus = this._CoursesService
        .updateCourse(this.courseId, course)
        .subscribe(data => {
          course.id = this.courseId
          alert('curso creado correctamente')
        })
      this.route.navigate(['/courses'])
    }
  }
  ngOnDestroy () {
    if (this.sus) {
      this.sus.unsubscribe()
    }
  }
}
