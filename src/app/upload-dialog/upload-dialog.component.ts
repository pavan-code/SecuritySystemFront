import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  files: any;
  file: any = "";
  hide: boolean = false;
  email: string = ""
  date: Date = new Date();
  constructor(private authService: AuthService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<UploadDialogComponent>) { }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user') || '{}').email
  }
  fileChanged(event: any) {
    this.files = [];
    const reader = new FileReader();
    let res = reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.file = reader.result;
      // console.log(this.file);
      
    };
  }
  openSnackbar(message: string) {
    this.snackbar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  upload() {    
    let date = this.date.toISOString().substr(0,10);
    this.hide = true;
    let data = {
      email: this.email,
      type: "image",
      data: this.file,
      uploadedAt: date,
      isFavorite: false
    }
    console.log(data);
    console.log(typeof date);
    
    this.authService.uploadMedia(data)
    .subscribe((data: any) => {
      this.hide = false
      if(data.jwt) {
        this.openSnackbar(data.message)
        setTimeout(() => {
          this.dialogRef.close(true);          
        }, 2100);
      } else {
        this.openSnackbar(data.message)
      }
    })
  }
}
