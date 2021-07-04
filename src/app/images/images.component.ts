import { UploadDialogComponent } from './../upload-dialog/upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  constructor(private dialog: MatDialog,
    private authService: AuthService) {}
  files: any;
  file: any
    email: string = ""
  images: any[] = [];

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user') || '{}').email
    
    this.authService.getImages(this.email, "image")
    .subscribe((data: any) => {
      console.log(data)
      this.images = data;
    })
  }
  fileChanged(event: any) {
    this.files = [];
    const reader = new FileReader();
    // for(let i=0; i<event.target.files.length; i++) {
    let res = reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.file = reader.result;
      console.log(this.file);
      // this.files.push(this.file)
    };
  }
  openDialog() {
    this.dialog.open(UploadDialogComponent, {
      width: '300px'
    }).afterClosed()
    .subscribe((data: any) => {
      console.log(data);   
      if(data)   
        this.ngOnInit();
    })
  }
}
