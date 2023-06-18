import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const authGuard: CanActivateFn = (route, state) => {

  // injection par programme (au lieu de le faire dans 
  // le constructeur d'un composant)
  let router = inject(Router);
  let loginService = inject(LoginService)

  // si ça renvoie true, alors, on peut activer la route
  return loginService.checkToken().then(authentifie => {
    if(authentifie) {
      return true;
    } else {
      console.log("Vous n'êtes pas connécte !");
      // et on retourne vers la page d'accueil
      router.navigate(["/login"]);
      return false;
    }
  })
};
