import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  login!: FormGroup;
  hide: boolean = true;

  ngOnInit(): void {
   
    this.createForm();
  }

  createForm() {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.login.valueChanges.subscribe((data) => this.onValueChanged(data));
  }
  formErrors: any = {
    email: '',
    password: '',
  };
  validationMsgs: any = {
    email: {
      required: 'Email ID required',
      email: 'Enter a valid email ID'
    },
    password: {
      required: 'Password is required',
    },
  };
  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success']
    });
  }

  getLogin() {
    console.log(this.login.value);
    this.hide = false;
    this.authService.login(this.login.value).subscribe(
      (res: any) => {
        console.log(res);
        delete res.user.password;
        this.hide = true;
        localStorage.setItem('token', res.jwt)
        localStorage.setItem('user', JSON.stringify(res.user))
        this.openSnackbar(res.message, '') 
        setTimeout(() => {
          location.href="home"
        }, 2500);    
      },
      (err) => console.log(err)
    );
  }
  onValueChanged(data?: any) {
    if (!this.login) {
      return;
    }
    const form = this.login;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }
}
