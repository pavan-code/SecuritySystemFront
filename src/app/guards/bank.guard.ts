import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // alert(localStorage.getItem('bankopen') == 'false')
      if(localStorage.getItem('bankopen') == 'false') {
        this.router.navigate(['/home']);
        // location.href = "home"
        return false;
      }        
      else
        return true;
      
  }
  
}
