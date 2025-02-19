import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from './custom-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
   //private baseUrl = 'http://127.0.0.1:8000/api'; Base URL de la API

   private baseUrl = 'https://157.230.191.4/api';

  constructor(private http: HttpClient, private router: Router) { }

  public authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  private cachedUser: any = JSON.parse(localStorage.getItem('user') || '{}'); // Cache user data

  // Manejo de tokens en LocalStorage
  public saveTokens(access: string, refresh: string) {
    console.log('Guardando tokens en localStorage');
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    const decoded = this.decodeJwt(access);
    console.log('Decoded Token:', decoded);  // Debugging step to check decoded token

    localStorage.setItem('user', JSON.stringify({ ...decoded, rol: decoded.rol }));
    this.authSubject.next(true); // Notify auth status change
  }

  decodeJwt(token: string): CustomJwtPayload {
    return jwtDecode<CustomJwtPayload>(token); // Decode token and return payload
  }

  getUser() {
    return this.cachedUser; // Return cached user data
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.baseUrl}/token/`, loginData).pipe(
      tap(response => {
        if (response.access) {
          this.saveTokens(response.access, response.refresh);
          const decoded = this.decodeJwt(response.access);
          console.log('Decoded Token:', decoded); // Debugging step
          this.cachedUser = { username: decoded.username, rol: decoded.rol, id: decoded.id }; // Ensure 'id' is set
          this.router.navigate([decoded.rol === 'admin' ? '/admin' : '/']);
        }
      }),
      catchError(error => {
        console.error('Error en el login:', error);
        return throwError(() => new Error('Credenciales incorrectas. Intenta nuevamente.'));
      })
    );
  }


  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registro/`, userData).pipe(
      catchError(error => {
        console.error('Error al registrar:', error);
        return throwError(() => new Error('Error al registrar usuario.'));
      })
    );
  }

  logout(): void {
    this.clearTokens();
    this.authSubject.next(false);
    this.cachedUser = {}; // Clear cached user
    this.router.navigate(['/login']);
  }

  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  // Verificar autenticación
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      this.refreshToken().subscribe({
        next: () => this.authSubject.next(true),
        error: () => this.authSubject.next(false),
      });
      return false;
    }

    return true;
  }

  // Verificar rol de admin
  isAdmin(): boolean {
    return this.cachedUser.rol === 'admin'; // Check cached user role
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return throwError(() => new Error('No hay token de actualización disponible.'));

    return this.http.post<any>(`${this.baseUrl}/token/refresh/`, { refresh: refreshToken }).pipe(
      tap(response => {
        if (response.access) {
          this.saveTokens(response.access, response.refresh);
        }
      }),
      catchError(error => {
        console.error('Error al actualizar el token:', error);
        this.logout();
        return throwError(() => new Error('No se pudo actualizar el token.'));
      })
    );
  }

  getUsername(): string {
    return this.cachedUser.username || ''; // Get cached username
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => {
        console.log('Respuesta de getUsers:', data);  // Ver qué datos recibes
      })
    );
  }

  // Obtener los detalles del usuario autenticado
  getUserDetails(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/usuario_detalle/');
  }

}
