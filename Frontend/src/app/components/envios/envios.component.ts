import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EnviosService } from '../../services/envios.service';

interface Envio {
  _id: string;
  destinatario: string;
  direccion: string;
  producto: string;
  estado: string;
  fechaCreacion: string;
  userId?: {
    name: string;
    email: string;
    role: string;
  };
}

@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css']
})
export class EnviosComponent implements OnInit {
  envios: Envio[] = [];
  role: string | null = null;
  cargando = true;

  constructor(
    private enviosService: EnviosService,
    private router: Router
  ) {}

  ngOnInit(): void {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    this.role = user.role; 
  }
  this.cargarEnvios();
}


  cargarEnvios() {
    this.cargando = true;
    this.enviosService.getEnvios().subscribe({
      next: (data: Envio[]) => {
        this.envios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  eliminarEnvio(id: string) {
    if (confirm('¿Seguro que quieres eliminar este envío?')) {
      this.enviosService.deleteEnvio(id).subscribe({
        next: () => this.cargarEnvios(),
        error: (err) => console.error(err)
      });
    }
  }

  editarEnvio(id: string) {
    this.router.navigate([`/envios/editar`, id]);
  }

  nuevoEnvio() {
    this.router.navigate(['/envios/nuevo']);
  }

  trackById(_: number, e: Envio) {
    return e._id;
  }
}
