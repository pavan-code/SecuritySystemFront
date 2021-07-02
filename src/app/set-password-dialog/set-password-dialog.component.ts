import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-set-password-dialog',
  templateUrl: './set-password-dialog.component.html',
  styleUrls: ['./set-password-dialog.component.scss']
})
export class SetPasswordDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SetPasswordDialogComponent>,
    private authService: AuthService) {
      this.email = data.email
     }
  setpassword!: FormGroup;
  email: any;
  checked: boolean = false;
  type: string = "password"

  formErrors:any  = {
    'password': '',
    'confirm': ''
  }
  validationMsgs: any = {
    'password': {
      'required': 'Password is required',
      'minlength': 'Password should be atleast 8 characaters long'
    },
    'confirm': {
      'required': 'Please confirm your password',
      
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.setpassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      // confirm: ['', Validators.required]
    })
    this.setpassword.valueChanges.subscribe(data => this.onValueChanged(data))
  }
  onValueChanged(data?: any) {
    if (!this.setpassword) {
      return;
    }
    const form = this.setpassword;
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
  changed(event: any) {
    this.checked = event.checked
    if(this.checked)
      this.type = "text"
    else
      this.type = "password"
  }
  openSnackbar(message: string) {
    this.snackbar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  submit() {
    let cred = {
      email: this.email,
      password: this.setpassword.value.password
    }
    console.log(cred);
    this.authService.setBankPassword(cred)
    .subscribe((data: any) => {
      console.log(data)
      this.dialogRef.close(data)
    })
  }
}
