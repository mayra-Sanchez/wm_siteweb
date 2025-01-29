import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() mostrarCarrito: boolean = false;
  carrito: any = null;
  total: number = 0;

  constructor(private carritoService: CartService) { }

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito() {
    this.carritoService.obtenerCarrito().subscribe({
      next: (response) => {
        console.log('Respuesta del carrito:', response);  // Verifica que los datos de imagen estén en la respuesta
        if (response.productos) {
          this.carrito = {
            productos: response.productos.map((producto: any) => ({
              id: producto.id,
              nombre: producto.producto,
              precio: producto.precio,
              cantidad: producto.cantidad,
              total_precio: producto.total_precio,
              imagen: producto.imagen,  // Asegúrate de que la imagen esté aquí
            })),
          };
          this.calcularTotal();
        } else {
          this.carrito = { productos: [] };
          console.error("No se encontraron productos en el carrito.");
        }
      },
      error: (error) => {
        console.error("Error al obtener el carrito:", error);
        this.carrito = { productos: [] };
      }
    });
  }    

  // Método para eliminar un producto del carrito
  removeFromCart(productId: number): void {
    if (!productId) {
      console.error('El productId es undefined o nulo');
      return;
    }
    this.carritoService.eliminarDelCarrito(productId).subscribe({
      next: response => {
        console.log('Producto eliminado del carrito:', response);
        this.obtenerCarrito();
      },
      error: error => {
        console.error('Error al eliminar del carrito:', error);
        alert('No se pudo eliminar del carrito. Por favor, intente nuevamente.');
      }
    });
  }

  // Método para aumentar la cantidad de un producto
  incrementarCantidad(productId: number): void {
    this.actualizarCantidad(productId, 1);
  }

  // Método para disminuir la cantidad de un producto
  decrementarCantidad(productId: number): void {
    this.actualizarCantidad(productId, -1);
  }

  // Método para actualizar la cantidad de un producto
  private actualizarCantidad(productId: number, cantidadCambio: number): void {
    const producto = this.carrito.productos.find((p: any) => p.id === productId);
    if (producto) {
      producto.cantidad += cantidadCambio;
      if (producto.cantidad < 1) producto.cantidad = 1;  // Evitar que la cantidad sea menor que 1
      this.carritoService.actualizarCantidadProducto(productId, producto.cantidad).subscribe({
        next: () => {
          this.calcularTotal();  // Recalcular el total después de actualizar la cantidad
        },
        error: error => {
          console.error('Error al actualizar cantidad:', error);
        }
      });
    }
  }

  calcularTotal(): void {
    if (!this.carrito || !this.carrito.productos) return;
    this.total = this.carrito.productos.reduce((sum: number, producto: any) => {
      const precio = Number(producto.precio);
      const cantidad = Number(producto.cantidad);
      return sum + (precio * cantidad);
    }, 0);
  }

  realizarCompra(): void {
    if (!this.carrito || !this.carrito.productos || this.carrito.productos.length === 0) return;

    let mensaje = 'Pedido desde la tienda:\n';
    this.carrito.productos.forEach((producto: any) => {
      mensaje += `- ${producto.nombre} x${producto.cantidad} - ${producto.precio * producto.cantidad} COP\n`;
    });
    mensaje += `Total: ${this.total} COP`;

    // Enviar el mensaje a través de WhatsApp
    this.carritoService.enviarPedidoWhatsApp(mensaje);
  }

}
