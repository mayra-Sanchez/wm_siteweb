import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //private apiUrl = 'http://127.0.0.1:8000/api/productos/';
  //private categoriesUrl = 'http://127.0.0.1:8000/api/categorias/';  // Endpoint de categorías

  private apiUrl = 'https://157.230.191.4/api/productos/';
  private categoriesUrl = 'https://157.230.191.4/api/categorias/';

  constructor(private http: HttpClient) { }

  // Obtener lista de productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Obtener productos por categoría
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?categoria=${categoryId}`);
  }

  // Obtener lista de categorías
  getCategories(): Observable<{ id: number; nombre: string }[]> {
    return this.http.get<{ id: number; nombre: string }[]>(this.categoriesUrl);
  }

  // Crear un nuevo producto
  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Actualizar un producto
  updateProduct(productId: number, updatedProduct: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}${productId}/`, updatedProduct);
  }

  // Eliminar un producto
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${productId}/`);
  }
}
