import { Component, ChangeDetectorRef } from '@angular/core';
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
    private router: Router,
    private recarga: ChangeDetectorRef
  ) {}

  async login() {
    this.cargando = true;

    this.authService.login(this.email, this.password).subscribe({
      next: async (res: any) => {
        this.cargando = false;

         await Swal.fire({
          title: '¡Bienvenido!',
          text: `Hola, ${res.user.name}`,
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        this.router.navigate(['/Usuario']);
      },
      error: async (err: any) => {
        this.cargando = false;
        this.recarga.detectChanges()

        const mensaje = err.error?.message || 'Error al iniciar sesión';

        await Swal.fire({
          title: 'Oops...',
          text: mensaje,
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          confirmButtonColor: '#d33',
        });
      },
    });
  }
}




