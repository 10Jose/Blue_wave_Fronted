import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionsService } from '../../Services/competitions.service';
import { TableComponent } from '../../components/table/table';

@Component({
  selector: 'app-competitions',
  imports: [CommonModule, TableComponent],
  templateUrl: './competitions.html',
  styleUrl: './competitions.css',
})
export class Competitions {

  competitions: any[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    public competitionsService: CompetitionsService,
    private cdr: ChangeDetectorRef
  ) {
    this.competitionsService.getCompetitions().subscribe({
      next: (data: any[]) => {
        console.log('data:', data);
        this.competitions = data;
        this.cargando = false;
        this.cdr.detectChanges();
        console.log('cargando:', this.cargando);
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'No se pudieron cargar las competencias';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}