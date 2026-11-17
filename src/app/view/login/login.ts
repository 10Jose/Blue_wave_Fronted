import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';

const CREDENTIALS = [
  {
    email: 'juan.perez@mail.com',
    password: 'juan123',
    user: {
      id: 1,
      name: 'Juan Pérez',
      document: '1001',
      email: 'juan.perez@mail.com',
      category: 'youth',
      active: true,
    },
  },
];

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';
  showPassword = false;
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    this.cargando = true;

    const found = CREDENTIALS.find(
      (c) => c.email === this.email && c.password === this.password
    );

    if (!found) {
      this.cargando = false;
      await Swal.fire({
        title: 'Oops...',
        text: 'Correo o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(found.user));
    }
    this.authService.currentUser.set(found.user);

    await Swal.fire({
      title: '¡Bienvenido!',
      text: `Hola, ${found.user.name}`,
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    this.router.navigate(['/Usuario']);
  }
}