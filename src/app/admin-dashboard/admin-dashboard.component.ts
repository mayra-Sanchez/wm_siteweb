import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  newProduct: FormData = new FormData();  // Cambiar a FormData para manejar archivos
  selectedFile: File | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // Obtener lista de productos
  getProducts(): void {
    this.loading = true;
    this.adminService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Hubo un problema al obtener los productos';
        console.error(error);
      }
    );
  }

  // Manejo de la selección de archivo (imagen)
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.newProduct.set('imagen', file, file.name);  // Solo agregar el archivo si existe
    } else {
      this.selectedFile = null;
      this.newProduct.delete('imagen');  // Eliminar la clave 'imagen' si no hay archivo
    }
  }  
  

  // Crear un producto
  createProduct(): void {
    // Agregar el resto de los campos al FormData
    this.newProduct.set('nombre', this.newProduct.get('nombre')?.toString() || '');
    this.newProduct.set('descripcion', this.newProduct.get('descripcion')?.toString() || '');
    this.newProduct.set('precio', this.newProduct.get('precio')?.toString() || '0');
    this.newProduct.set('stock', this.newProduct.get('stock')?.toString() || '0');
    this.newProduct.set('categoria', this.newProduct.get('categoria')?.toString() || '');

    this.loading = true;
    this.adminService.createProduct(this.newProduct).subscribe(
      (response) => {
        this.products.push(response);  // Agregar el nuevo producto a la lista
        this.resetProductForm();  // Resetear formulario
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Hubo un problema al agregar el producto';
        console.error(error);
        this.loading = false;
      }
    );
  }

  // Actualizar un producto
  updateProduct(productId: number): void {
    // Agregar el resto de los campos al FormData
    this.newProduct.set('nombre', this.newProduct.get('nombre')?.toString() || '');
    this.newProduct.set('descripcion', this.newProduct.get('descripcion')?.toString() || '');
    this.newProduct.set('precio', this.newProduct.get('precio')?.toString() || '0');
    this.newProduct.set('stock', this.newProduct.get('stock')?.toString() || '0');
    this.newProduct.set('categoria', this.newProduct.get('categoria')?.toString() || '');

    this.loading = true;
    this.adminService.updateProduct(productId, this.newProduct).subscribe(
      (response) => {
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
          this.products[index] = response;  // Actualizar el producto editado
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Hubo un problema al actualizar el producto';
        console.error(error);
        this.loading = false;
      }
    );
  }

  // Eliminar un producto
  deleteProduct(productId: number): void {
    this.loading = true;
    this.adminService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== productId);  // Eliminar el producto de la lista
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Hubo un problema al eliminar el producto';
        console.error(error);
        this.loading = false;
      }
    );
  }

  // Resetear formulario de producto
  resetProductForm(): void {
    this.newProduct = new FormData();  // Resetear FormData
    this.selectedFile = null;  // Limpiar archivo seleccionado
  }
}
