export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string | null;  
  categoria: { id: number; nombre: string }; 
}
