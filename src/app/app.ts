import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EstilosComponent } from './components/estilos/estilos.component';

@Component({
  selector: 'app-root',
  imports: [EstilosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('natacion');
}
