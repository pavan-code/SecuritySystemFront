import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit, OnDestroy {
  checked: boolean = false;
  type: string = "password";

  constructor(private fb: FormBuilder, private authService: AuthService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.email = data.email
      this.invokedBy = data.invoke
    }

  getpassword!: FormGroup;
  email: string = ""
  invokedBy: string = ""
  
  ngOnInit(): void {
    this.createForm();
  }
  ngOnDestroy(): void {
    // alert('destroyed')
  }
  formErrors:any  = {
    'password': '',
    
  }
  validationMsgs: any = {
    'password': {
      'required': 'Password is required',
      'minlength': 'Password should be atleast 8 characaters long'
    }
  }
  onValueChanged(data?: any) {
    if (!this.getpassword) {
      return;
    }
    const form = this.getpassword;
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
  createForm() {
    this.getpassword = this.fb.group({
      password: ['', [Validators.required]]
    })
    this.getpassword.valueChanges.subscribe(data => this.onValueChanged(data))
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
    let data = {
      email: this.email,
      password: this.getpassword.value.password
    }
    if(this.invokedBy == 'bank') {
      this.authService.checkBankPassword(data)
      .subscribe((data: any) => {
        // console.log(data)
        if(data) {        
          this.dialogRef.close(data)
        } else {
          this.openSnackbar("Incorrect Password!")
          this.ngOnInit();
        }
      })
    } else {
      this.authService.checkMediaPassword(data)
      .subscribe((data: any) => {
        // console.log(data)
        if(data) {        
          this.dialogRef.close(data)
        } else {
          this.openSnackbar("Incorrect Password!")
          this.ngOnInit();
        }
      })
    }
  }

}
