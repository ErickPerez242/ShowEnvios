import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
  const userData = localStorage.getItem('user');
  if (!userData) return false;

  const user = JSON.parse(userData);
  return !!user; // true si existe
}

}
