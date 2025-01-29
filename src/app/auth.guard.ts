import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.apiService.getUser();

    // Acceder a roles usando notación de corchetes
    const requiredRoles = route.data['roles'];

    if (user && requiredRoles && requiredRoles.includes(user['rol'])) {
      return true;
    } else {
      // Redirigir al login si no tiene el rol adecuado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
