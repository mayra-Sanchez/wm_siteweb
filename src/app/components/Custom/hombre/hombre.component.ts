import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin-dashboard/services/admin.service';
import { Product } from 'src/app/models/product';
import { Category } from '../../../models/category';
import { ApiService } from '../../../services/api.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-hombre',
  templateUrl: './hombre.component.html',
  styleUrls: ['./hombre.component.css']
})
export class HombreComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  searchQuery: string = '';
  selectedCategory: number = 1;
  isModalOpen: boolean = false;
  selectedProduct: Product | null = null;
  isImageExpanded: boolean = false;

  constructor(private adminService: AdminService, private apiService: ApiService, private cartService: CartService) { } // Injected ApiService here

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts(); // Cargar los productos de la categoría "Hombre"
  }

  loadProducts(): void {
    this.adminService.getProductsByCategory(this.selectedCategory).subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = [...this.products]; // Inicializa los productos filtrados
    });
  }

  loadCategories(): void {
    this.adminService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory ? product.categoria.id === this.selectedCategory : true; // Cambié aquí para acceder al `id`
      return matchesSearch && matchesCategory;
    });
  }

  onCategoryChange(categoryId: number): void {
    this.selectedCategory = categoryId;
    this.loadProducts(); // Recargar los productos cuando cambie la categoría
  }

  viewProduct(product: Product): void {
    this.selectedProduct = product; // Asignamos el producto seleccionado
    this.isModalOpen = true; // Abrimos el modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Cerrar el modal
    this.isImageExpanded = false;  // Resetear el estado de la imagen cuando se cierre el modal
  }

  // Función para alternar el tamaño de la imagen
  toggleImageSize(): void {
    this.isImageExpanded = !this.isImageExpanded;
  }

  isLoading: boolean = false;

  // Método para agregar el producto al carrito
  addToCart(product: Product | null): void {
    if (!product) {
      console.log('No se ha seleccionado un producto.');
      return;
    }

    this.isLoading = true;

    this.cartService.addToCart(product.id).subscribe({
      next: response => {
        console.log('Producto agregado al carrito:', response);
        this.isLoading = false;
      },
      error: error => {
        console.error('Error al agregar al carrito:', error);
        alert('No se pudo agregar al carrito. Por favor, intente nuevamente.');
        this.isLoading = false;
      }
    });
  }


}
