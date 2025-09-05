import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {
  private apiUrl = 'http://localhost:5000/api/envios'; // backend

  constructor(private http: HttpClient) {}

  // 🔹 Añadir token en headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getEnvios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getEnvio(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  crearEnvio(envio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, envio, { headers: this.getHeaders() });
  }

  updateEnvio(id: string, envio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, envio, { headers: this.getHeaders() });
  }

  deleteEnvio(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
