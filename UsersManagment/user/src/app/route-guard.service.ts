import { AuthService } from './services/auth.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{ //è un interfaccia che ci permette di decidere quali rotte possono essere abilitate o meno 
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
 

  constructor(private router: Router,
              private auth: AuthService) { 
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { //route: contiene informazioni inerenti ad una rotta | state: stato della rotta
   
    if(this.auth.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']); //anzichè bloccare la navigazione possiamo indirizzarlo ad una pagina diversa
    }

    //return false; in questo caso la navigazione non verrebbe permessa
  }
}
