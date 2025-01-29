import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin-dashboard/services/admin.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {
  products: Product[] = [];
  productForm!: FormGroup;
  selectedFile: File | null = null;
  editMode = false;
  selectedProductId: number | null = null;
  categorias: { id: number; nombre: string }[] = [];
  isModalOpen = false; // Controla la visibilidad del modal

  constructor(private fb: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchProducts();
    this.loadCategories();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imagen: [null],
      categoria: ['', [Validators.required]],
    });
  }

  loadCategories(): void {
    this.adminService.getCategories().subscribe(
      (data) => (this.categorias = data),
      (error) => console.error('Error al cargar las categorías:', error)
    );
  }

  fetchProducts(): void {
    this.adminService.getProducts().subscribe(
      (data) => (this.products = data),
      (error) => console.error('Error al obtener productos:', error)
    );



  }


  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    const productData = this.productForm.value;

    formData.append('nombre', productData.nombre);
    formData.append('descripcion', productData.descripcion);
    formData.append('precio', productData.precio);
    formData.append('stock', productData.stock);
    formData.append('categoria', productData.categoria);

    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    if (this.editMode && this.selectedProductId !== null) {
      this.adminService.updateProduct(this.selectedProductId, formData).subscribe(
        () => {
          this.fetchProducts();
          this.resetForm();
          this.closeModal();
        },
        (error) => console.error('Error al actualizar producto:', error)
      );
    } else {
      this.adminService.createProduct(formData).subscribe(
        () => {
          this.fetchProducts();
          this.resetForm();
          this.closeModal();
        },
        (error) => console.error('Error al crear producto:', error)
      );
    }

  }

  editProduct(product: Product): void {
    this.editMode = true;
    this.selectedProductId = product.id;
    this.productForm.patchValue({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      categoria: product.categoria,
    });
    this.selectedFile = null;
    this.openModal();
  }

  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.adminService.deleteProduct(productId).subscribe(
        () => this.fetchProducts(),
        (error) => console.error('Error al eliminar producto:', error)
      );
    }
  }

  resetForm(): void {
    this.editMode = false;
    this.selectedProductId = null;
    this.productForm.reset();
    this.selectedFile = null;
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }
}
