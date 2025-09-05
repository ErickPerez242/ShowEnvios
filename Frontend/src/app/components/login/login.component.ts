import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          // ✅ guardamos el token + el objeto user completo
          this.authService.saveSession(res.token, res.user);
          this.router.navigate(['/productos']);
        },
        error: () => {
          this.error = 'Credenciales incorrectas';
        }
      });
  }
}


