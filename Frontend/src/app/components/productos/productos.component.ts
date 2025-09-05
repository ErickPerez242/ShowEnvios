import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService, Producto } from '../../services/productos.service';
import { EnviosService } from '../../services/envios.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private enviosService: EnviosService
  ) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  agregarAlCarrito(producto: Producto) {
    const envio = {
      destinatario: "Cliente Web", // puedes pedirlo en un form
      direccion: "Dirección de prueba", // o recoger del usuario logueado
      producto: producto.nombre,
      estado: "pendiente"
    };

    this.enviosService.crearEnvio(envio).subscribe({
      next: () => {
        alert(`✅ ${producto.nombre} agregado al carrito (registrado en envíos) 🛒`);
      },
      error: (err) => {
        alert("❌ Error al crear el envío");
        console.error(err);
      }
    });
  }
}



