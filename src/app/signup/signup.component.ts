import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor( private authService: AuthService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) { }

  register!: FormGroup
  hide: boolean = true;

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.register = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
    this.register.valueChanges.subscribe((data) => this.onValueChanged(data));
  }
  formErrors: any = {
    username: '',
    email: '',
    password: '',
    mobile: ''
  };
  validationMsgs: any = {
    username: {
      required: 'Username is required',
      minlength: 'Atleast 5 characters long'
    },
    email: {
      required: 'Email ID required',
      email: 'Enter a valid email ID'
    },
    password: {
      required: 'Password is required',
      minlength: "Minimum 8 characters is required"
    },
    mobile: {
      required: 'Mobile number is required',
      pattern: 'Enter a valid 10 digit number'
    }
  };
  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success']
    });
  }
  registerData() {
    this.hide = false;
    this.authService.register(this.register.value)
    .subscribe((data: any) => {
      this.hide = true;
      console.log(data)

    })
  }
  onValueChanged(_data?: any) {
    if (!this.register) {
      return;
    }
    const form = this.register;
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
