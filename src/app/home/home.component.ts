import { Router } from '@angular/router';
import { SetPasswordDialogComponent } from './../set-password-dialog/set-password-dialog.component';
import { PasswordDialogComponent } from './../password-dialog/password-dialog.component';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService,
	private router: Router,
	private dialog: MatDialog) {}

  email: string = '';

  ngOnInit(): void {
	  this.email = JSON.parse(localStorage.getItem('user') || '{}').email;
  }

  openBank() {
	  this.authService.didSetBankPassword(this.email)
	  .subscribe((data: any) => {
		  console.log(data)
		  if(data == true) {
			const dialogRef = this.dialog.open(PasswordDialogComponent, {
				width: '350px',
				data: {
					'email': this.email
				}
			  });
		  
			  dialogRef.afterClosed().subscribe(result => {
				console.log(result);
				if(result == true)
					this.router.navigateByUrl("/bank-home")
				
			  });
		  }
		  else {
			const dialogRef = this.dialog.open(SetPasswordDialogComponent, {
				width: '350px',
				data: {
					'email': this.email
				}
			  });
		  
			  dialogRef.afterClosed().subscribe(result => {
				console.log(result);
				
				
			  });
		  }
	  })
  }
}
