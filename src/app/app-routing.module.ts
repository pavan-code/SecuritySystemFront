import { VideoComponent } from './video/video.component';
import { AudioComponent } from './audio/audio.component';
import { ImagesComponent } from './images/images.component';
import { MediaHomeComponent } from './media-home/media-home.component';
import { MediaGuard } from './guards/media.guard';
import { BankHomeComponent } from './bank-home/bank-home.component';

import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { BankGuard } from './guards/bank.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bank-home', component: BankHomeComponent, canActivate: [BankGuard] },
  { path: 'media-home', component: MediaHomeComponent, canActivate: [MediaGuard] },
    
      { path: 'media-home/images', component: ImagesComponent, canActivate: [MediaGuard] },
      { path: 'media-home/audios', component: AudioComponent, canActivate: [MediaGuard] },
      { path: 'media-home/videos', component: VideoComponent, canActivate: [MediaGuard] }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
