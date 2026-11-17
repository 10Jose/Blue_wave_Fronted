import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosService } from '../../Services/usuarios';
import { TableComponent } from '../../components/table/table';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, TableComponent],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {

  swimmers: any[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    public usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef
  ) {
    this.usuariosService.getUsuarios().subscribe({
      next: (data: any[]) => {
        console.log('data:', data);
        this.swimmers = data;
        this.cargando = false;
        this.cdr.detectChanges();
        console.log('cargando:', this.cargando);
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'No se pudieron cargar los nadadores';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}