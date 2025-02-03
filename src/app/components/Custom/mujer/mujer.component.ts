import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin-dashboard/services/admin.service';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-mujer',
  templateUrl: './mujer.component.html',
  styleUrls: ['./mujer.component.css']
})
export class MujerComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  searchQuery: string = '';
  selectedCategory: number = 2; // Predeterminado para "Mujer"

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts(); // Cargar los productos de la categoría "Mujer"
  }

  loadProducts(): void {
    this.adminService.getProductsByCategory(this.selectedCategory).subscribe((data: Product[]) => {
      console.log('Productos cargados:', data);  // Verifica qué productos devuelve la API
      this.products = data;
      this.filteredProducts = [...this.products];  // Inicializa los productos filtrados
    });
  }

  loadCategories(): void {
    this.adminService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories);  // Verificar que las categorías están siendo cargadas
    });
  }

  filterProducts(): void {
    console.log('Filtrando productos...');
    this.filteredProducts = this.products.filter(product => {
      // Filtro por búsqueda de nombre y descripción
      const matchesSearch = product.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            product.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      // Filtro por categoría seleccionada
      const matchesCategory = this.selectedCategory ? product.categoria.id === this.selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });

    console.log('Productos filtrados:', this.filteredProducts);
  }

  onCategoryChange(categoryId: number): void {
    this.selectedCategory = categoryId;
    this.loadProducts(); // Recargar los productos cuando cambie la categoría
  }

  viewProduct(product: Product): void {
    console.log('Ver información del producto:', product);
    // Aquí podrías redirigir a una página de detalles del producto o mostrar un modal con la información
  }

  // Método para agregar el producto al carrito
  addToCart(product: Product): void {
    console.log('Agregar al carrito:', product);
    // Aquí podrías agregar el producto al carrito del usuario
  }
}
