import { Injectable, OnInit } from '@angular/core'
import { NotifierComponent } from '../components/notifier/notifier.component'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnInit {
  constructor (private snackBar: MatSnackBar) {}

  showNotification (displayMessage: string, buttonText: string) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText
      },
      duration: 4000,
      panelClass: 'success'
    })
  }

  ngOnInit (): void {}
}
