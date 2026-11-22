import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesoriosService } from '../../Services/accesorios.service';
import { TableComponent } from '../../components/table/table';

@Component({
  selector: 'app-accesorios',
  imports: [CommonModule, TableComponent],
  templateUrl: './accesorios.html',
  styleUrl: './accesorios.css',
})
export class Accesorios {

  accesorios: any[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    public accesoriosService: AccesoriosService,
    private cdr: ChangeDetectorRef
  ) {
    this.accesoriosService.getAccesorios().subscribe({
      next: (data: any[]) => {
        console.log('data:', data);
        this.accesorios = data;
        this.cargando = false;
        this.cdr.detectChanges();
        console.log('cargando:', this.cargando);
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'No se pudieron cargar los accesorios';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}