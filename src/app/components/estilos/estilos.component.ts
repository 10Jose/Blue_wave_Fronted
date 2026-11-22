import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, Router } from '@angular/router';
import { HubAvatarComponent } from 'ng-hub-ui-avatar';
import Swal from 'sweetalert2';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-estilos',
  templateUrl: './estilos.component.html',
  styleUrl: './estilos.component.css',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    AsyncPipe,
    RouterOutlet,
    HubAvatarComponent,
  ],
})
export class EstilosComponent {
  isHandset$: Observable<boolean>;

constructor(
    public authService: AuthService,           
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }

  async logout() {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tendrás que iniciar sesión de nuevo para volver a entrar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      this.authService.logout();

      await Swal.fire({
        title: '¡Hasta pronto!',
        text: 'Sesión cerrada correctamente',
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      this.router.navigate(['/']);
    }
  }
}