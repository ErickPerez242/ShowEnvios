import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EnviosService } from '../../services/envios.service';

@Component({
  selector: 'app-envios-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envios-form.component.html',
  styleUrls: ['./envios-form.component.css']
})
export class EnviosFormComponent implements OnInit {
  envioId: string | null = null;
  destinatario: string = '';
  direccion: string = '';
  producto: string = '';
  estado: string = 'pendiente'; // valor por defecto
  error: string = '';
  success: string = '';

  constructor(
    private enviosService: EnviosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Revisar si viene un id en la ruta (modo edición)
    this.envioId = this.route.snapshot.paramMap.get('id');
    if (this.envioId) {
      this.enviosService.getEnvio(this.envioId).subscribe({
        next: (envio) => {
          this.destinatario = envio.destinatario;
          this.direccion = envio.direccion;
          this.producto = envio.producto;
          this.estado = envio.estado;
        },
        error: () => {
          this.error = '❌ Error al cargar el envío';
        }
      });
    }
  }

  guardarEnvio() {
    if (!this.destinatario || !this.direccion || !this.producto) {
      this.error = '⚠️ Todos los campos son obligatorios';
      return;
    }

    const envio = {
      destinatario: this.destinatario,
      direccion: this.direccion,
      producto: this.producto,
      estado: this.estado
    };

    if (this.envioId) {
      // 🔹 Editar
      this.enviosService.updateEnvio(this.envioId, envio).subscribe({
        next: () => {
          this.success = '✅ Envío actualizado con éxito';
          this.error = '';
          setTimeout(() => this.router.navigate(['/envios']), 1500);
        },
        error: () => {
          this.error = '❌ Error al actualizar el envío';
          this.success = '';
        }
      });
    } else {
      // 🔹 Crear
      this.enviosService.crearEnvio(envio).subscribe({
        next: () => {
          this.success = '✅ Envío registrado con éxito';
          this.error = '';
          setTimeout(() => this.router.navigate(['/envios']), 1500);
        },
        error: () => {
          this.error = '❌ Error al registrar el envío';
          this.success = '';
        }
      });
    }
  }
}
