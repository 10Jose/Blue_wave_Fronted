import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private readonly url = 'https://bluewave-production-d04b6e52.up.railway.app';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  public getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // Crear un usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.url, usuario);
  }

  // Actualizar completamente un usuario
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, usuario);
  }

  // Actualizar parcialmente un usuario
  actualizarParcialUsuario(id: number, usuario: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, usuario);
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
