import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EnviosComponent } from './components/envios/envios.component';
import { RegisterComponent } from './components/register/register.component';
import { EnviosFormComponent } from './components/envios-form/envios-form.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'envios', component: EnviosComponent, canActivate: [AuthGuard] },
  { path: 'envios/nuevo', component: EnviosFormComponent, canActivate: [AuthGuard] },
  { path: 'envios/editar/:id', component: EnviosFormComponent, canActivate: [AuthGuard] },

  // esta ruta solo debe ser visible para admins
  { path: 'usuarios', loadComponent: () => import('./components/usuarios/usuarios.component').then(m => m.UsuariosComponent), canActivate: [AuthGuard, AdminGuard] },
];

