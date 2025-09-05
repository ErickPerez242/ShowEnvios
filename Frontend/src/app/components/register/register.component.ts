import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';      // 👈 ahora está bien
  email: string = '';
  password: string = '';
  role: string = 'user'; 
  error: string = '';
  success: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        this.success = '✅ Registro exitoso. Ahora puedes iniciar sesión.';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.error = '❌ Error en el registro. Intenta de nuevo.';
        this.success = '';
      }
    });
  }
}
