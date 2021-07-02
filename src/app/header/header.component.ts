import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router, private snackbar: MatSnackBar) { }
  show: boolean = false;

  ngOnInit(): void {
    this.show = this.authService.isLoggedIn();
  }
   openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success']
    });
  }

  logout() {
    localStorage.clear();
    this.openSnackbar("Logged out Successfully", '')
    setTimeout(() => {
      location.href="login"
    }, 2500)
  }

}
