import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin-dashboard/services/admin.service';
import { Product } from 'src/app/models/product';
import { CartService } from '../../../services/cart.service'; 

@Component({
  selector: 'app-carrusel-accesorios',
  templateUrl: './carrusel-accesorios.component.html',
  styleUrls: ['./carrusel-accesorios.component.css']
})
export class CarruselAccesoriosComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: number = 3;
  currentIndex: number = 0; // Índice actual del carrusel
  modalOpen: boolean = false; // Controla si el modal está abierto o cerrado
  selectedProduct: Product | null = null; // Producto seleccionado para el modal
  isLoading: boolean = false; // Para controlar el estado de carga al agregar al carrito

  constructor(
    private adminService: AdminService,
    private cartService: CartService // Inyectar el servicio CartService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getProductsByCategory(this.selectedCategory).subscribe((data: Product[]) => {
      this.products = data;
      console.log('Productos cargados:', this.products);  // Verifica que los productos estén llegando
    });
  }

  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.products.length - 1 : this.currentIndex - 1;
  }

  moveToNext(): void {
    this.currentIndex = (this.currentIndex === this.products.length - 1) ? 0 : this.currentIndex + 1;
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.modalOpen = true; // Abre el modal
  }

  closeModal(): void {
    this.modalOpen = false; // Cierra el modal
    this.selectedProduct = null; // Limpia el producto seleccionado
  }

  // Método para agregar al carrito usando el servicio CartService
  addToCart(product: Product): void {
    if (!product) {
      console.log('No se ha seleccionado un producto.');
      return;
    }

    this.isLoading = true; // Activa el estado de carga

    this.cartService.addToCart(product.id).subscribe({
      next: response => {
        console.log('Producto agregado al carrito:', response);
        this.isLoading = false; // Desactiva el estado de carga
        this.closeModal(); // Cierra el modal después de agregar el producto al carrito
      },
      error: error => {
        console.error('Error al agregar al carrito:', error);
        alert('No se pudo agregar al carrito. Por favor, intente nuevamente.');
        this.isLoading = false; // Desactiva el estado de carga
      }
    });
  }
}