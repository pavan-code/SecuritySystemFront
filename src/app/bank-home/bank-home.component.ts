import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBankAccountComponent } from './../add-bank-account/add-bank-account.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bank-home',
  templateUrl: './bank-home.component.html',
  styleUrls: ['./bank-home.component.scss']
})
export class BankHomeComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  accounts: any;
  email: string = ""
  hide: boolean = true;

  displayedColumns: string[] = [
    'index', 'holdername', 'bankname', 'accountno', 'ifsccode', 
    'email', 'mobile', 'address', 'actions'
  ]
  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user') || '{}').email;
      this.authService.getBankAccountsByEmail(this.email)
      .subscribe((data: any) => {
        this.hide = false;
        // console.log(data);
        this.accounts = data;
        
      })
  }
  openSnackbar(message: string) {
    this.snackbar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  ngOnDestroy(): void {
    localStorage.setItem('bankopen', 'false')
  }
  delete(index: number) {
    this.authService.deleteAccount(index)
    .subscribe((data: any) => {
      this.openSnackbar(data.message);
      setTimeout(() => {
        this.ngOnInit();
      }, 2100);
    })
  }
  update(account: any) {
    // console.log(account);
    this.dialog.open(AddBankAccountComponent, {
      width: '800px',
      data: {
        mode: 'edit',
        account: account
      }
    }).afterClosed()
    .subscribe((data: any) => {
      if(data)
        this.ngOnInit()
    })
    
  }
  addAccount() {
    this.dialog.open(AddBankAccountComponent, {
      width: '800px',
      data: {
        mode: 'add'
      }
    }).afterClosed()
    .subscribe((data: any) => {
      // console.log(data)
      if(data)
        this.ngOnInit();
    })
  }

}
