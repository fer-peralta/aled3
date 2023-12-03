import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NotificationsService } from 'src/app/core/services/notifications.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginForm!: FormGroup
  hide = true
  admin = {
    user: 'aled@itbeltran.com.ar',
    password: 'soloprofesores'
  }
  isLogged = false

  constructor (
    private fb: FormBuilder,
    private route: Router,
    private _NotificationsService: NotificationsService
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login () {
    const loginUser = this.loginForm.value
    if (
      loginUser.user === this.admin.user &&
      loginUser.password === this.admin.password
    ) {
      this.isLogged = true
      localStorage.setItem('login', `${Math.floor(Math.random() * 1000000000)}`)
      this.route.navigate(['/students'])
      this._NotificationsService.showNotification('Acceso permitido', 'ok')
    } else {
      this.isLogged = false
      this._NotificationsService.showNotification('Acceso denegado', 'ok')
    }
  }
}
