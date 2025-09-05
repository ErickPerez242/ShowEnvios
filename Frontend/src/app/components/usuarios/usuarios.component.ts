import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  _id: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  cargando = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.http.get<Usuario[]>('http://localhost:5000/api/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: (res) => {
        this.usuarios = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar usuarios';
        this.cargando = false;
      }
    });
  }
}
