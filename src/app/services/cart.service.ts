import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private apiservice: ApiService) { }

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('User not authenticated.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  obtenerCarrito(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/ver-carrito/`, { headers }).pipe(
      catchError(this.handleError('obtenerCarrito'))
    );
  }

  eliminarDelCarrito(productId: number): Observable<any> {
    if (!productId) {
      return throwError(() => new Error('productId es undefined o nulo'));
    }

    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.delete<any>(`${this.apiUrl}/eliminar_del_carrito/${productId}/`, { headers }).pipe(
      catchError(error => {
        console.error('Error al eliminar del carrito:', error);
        return throwError(() => new Error('No se pudo eliminar del carrito.'));
      })
    );
  }


  enviarPedidoWhatsApp(mensaje: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/enviar-carrito/`, { headers }).pipe(
      catchError(this.handleError('enviarPedidoWhatsApp'))
    );
  }

  registrarCompra(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/registrar-compra/`, {}, { headers }).pipe(
      catchError(this.handleError('registrarCompra'))
    );
  }

  addToCart(productId: number): Observable<any> {
    const userId = this.apiservice.getUser().user_id;
    console.log('User ID:', userId);

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return throwError(() => new Error('User not authenticated.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    console.log('Adding to cart:', { userId, productId });

    const body = { user_id: userId, product_id: productId };

    return this.http.post<any>(`${this.apiUrl}/agregar_al_carrito/${productId}/`, body, { headers }).pipe(
      catchError(error => {
        console.error('Error al agregar al carrito:', error);
        return throwError(() => new Error('No se pudo agregar al carrito.'));
      })
    );
  }

  actualizarCantidadProducto(productId: number, cantidad: number): Observable<any> {
    const headers = this.getHeaders();  // Obtienes los headers con el token de autenticación
  
    return this.http.put<any>(`${this.apiUrl}/actualizar-cantidad-producto/${productId}/`, 
                              { cantidad }, 
                              { headers }).pipe(
      catchError(this.handleError('actualizarCantidadProducto'))
    );
  }
  

  limpiarCarrito(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/vaciar-carrito/`, { headers }).pipe(
      catchError(this.handleError('limpiarCarrito'))
    );
  }

  private handleError(operation: string) {
    return (error: any) => {
      const errorMessage = error.error.message || error.message || 'Error desconocido';
      console.error(`${operation} failed: ${errorMessage}`);
      return throwError(() => new Error(`${operation} failed: ${errorMessage}`));
    };
  }
}
