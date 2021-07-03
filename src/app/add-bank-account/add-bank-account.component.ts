import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.scss']
})
export class AddBankAccountComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<AddBankAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dialogdata = data;
     }

  dialogdata: any;
  addbank!: FormGroup
  email: string = ""
  hide: boolean = false;
  username: string = ""

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem("user") || '{}').email
    this.username = JSON.parse(localStorage.getItem("user") || '{}').username
    if(this.dialogdata.mode == "add")
      this.createForm()
    else
      this.updateForm()
  }
  formErrors: any = {
    holderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',    
    mobile: '',
    branch: '',
    address: ''
  };
  validationMsgs: any = {
    holderName: {
      required: 'Holder Name is required',
    },
    bankName: {
      required: 'Bank Name is required',
    },
    accountNumber: {
      required: 'Account Number is required',
      pattern: 'Must contain only numbers from 0-9'
    },
    ifscCode: {
      required: 'IFSC Code is required',
    },
    
    mobile: {
      required: 'Mobile No. is required',
      pattern: 'Enter a valid 10 digit number'
    },
    branch: {
      required: 'Branch is required',
    },
    address: {
      required: 'Address is required',
    },
  };
  createForm() {
    this.addbank = this.fb.group({
      holderName: [this.username, [Validators.required]],
      bankName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      ifscCode: ['', [Validators.required]],
      email: [this.email],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      branch: ['', [Validators.required]],
      address: ['', [Validators.required]]
    })
    this.addbank.valueChanges.subscribe(data => this.onValueChanged(data))
  }
  updateForm() {
    this.addbank = this.fb.group({
      holderName: [this.dialogdata.account.holderName, [Validators.required]],
      bankName: [this.dialogdata.account.bankName, [Validators.required]],
      accountNumber: [this.dialogdata.account.accountNumber, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      ifscCode: [this.dialogdata.account.ifscCode, [Validators.required]],
      email: [this.email],
      mobile: [this.dialogdata.account.mobile, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      branch: [this.dialogdata.account.branch, [Validators.required]],
      address: [this.dialogdata.account.address, [Validators.required]]
    })
    this.addbank.valueChanges.subscribe(data => this.onValueChanged(data))
  }

  onValueChanged(data?: any) {
    if (!this.addbank) {
      return;
    }
    const form = this.addbank;
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
  openSnackbar(message: string) {
    this.snackbar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  addAccount() {
    this.hide = true
    // console.log(this.addbank.value);
    this.authService.addBankAccount(this.addbank.value)
    .subscribe((data: any) => {
      this.hide = false
      // console.log(data)
      if(data.jwt == "success") {
        this.openSnackbar(data.message)
        setTimeout(() => {
          this.dialogRef.close(true)
        }, 2100);
      } else {
        this.openSnackbar(data.message)
        this.ngOnInit();
      }
    })
  }
  updateAccount() {
    this.hide = true;
    let formdata = this.addbank.value
    formdata.id = this.dialogdata.account.id
    // console.log(formdata);
    
    this.authService.updateAccount(formdata)
    .subscribe((data: any) => {
      this.hide = false;
      // console.log(data);
      if(data.jwt == "success") {
        this.openSnackbar(data.message)
        setTimeout(() => {
          this.dialogRef.close(true)
        }, 2100);
      } else {
        this.openSnackbar(data.message)
        this.ngOnInit()
      }      
    })
  }
}
