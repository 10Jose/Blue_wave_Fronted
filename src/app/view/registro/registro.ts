import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import Swal from 'sweetalert2';
import { UsuariosService } from '../../Services/usuarios';

@Component({
  selector: 'app-registro',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  name = '';
  document = '';
  birth_date = '';
  gender = '';
  email = '';
  password = '';           
  confirmPassword = '';    
  phone = '';
  category = '';

  guardando = false;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  async guardar() {
    if (this.password !== this.confirmPassword) {
      await Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
      });
      return;
    }

    // Validar longitud mínima
    if (this.password.length < 6) {
      await Swal.fire({
        title: 'Error',
        text: 'La contraseña debe tener al menos 6 caracteres',
        icon: 'error',
      });
      return;
    }

    this.guardando = true;

    const payload = {
      name: this.name,
      document: this.document,
      birth_date: this.birth_date,
      gender: this.gender,
      email: this.email,
      password: this.password,          
      phone: this.phone || null,
      category: this.category || null,
      active: true,
    };

    this.usuariosService.crearUsuario(payload).subscribe({
      next: async (res) => {
        this.guardando = false;

        await Swal.fire({
          title: '¡Registrado!',
          text: `El nadador ${res.name} se creó correctamente`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        this.router.navigate(['/Usuario']);
      },
      error: async (err) => {
        this.guardando = false;

        let mensaje = 'No se pudo registrar';

        if (err.error?.detail?.includes('users_email_key')) {
          mensaje = 'Ya existe un usuario con ese email';
        } else if (err.error?.detail?.includes('swimmers_document_key')) {
          mensaje = 'Ya existe un nadador con ese documento';
        } else if (err.error?.message) {
          mensaje = err.error.message;
        }

        await Swal.fire({
          title: 'Error',
          text: mensaje,
          icon: 'error',
        });
      },
    });
  }

  cancelar() {
    this.router.navigate(['/Usuario']);
  }
}