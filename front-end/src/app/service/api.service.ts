// app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = API_ENDPOINTS.BASE_URL;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, isAuth: boolean): Observable<T> {
    const headers = this.getHeaders(isAuth);  
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers });
  }
  
  post<T>(endpoint: string, data: any, isAuth: boolean): Observable<T> {
    const headers = this.getHeaders(isAuth);  
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }
  
  put<T>(endpoint: string, data: any, isAuth: boolean): Observable<T> {
    const headers = this.getHeaders(isAuth);  
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }
  
  delete<T>(endpoint: string, isAuth: boolean): Observable<T> {
    const headers = this.getHeaders(isAuth);  
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers });
  }
  
  // Helper method to get headers based on isAuth flag
  private getHeaders(isAuth: boolean) {
    let headers = {};
  
    if (isAuth) {
      const token = localStorage.getItem('token');  // Get the token from localStorage
      if (token) {
        headers = {
          Authorization: `Bearer ${token}`,  // Add the token to the headers
        };
      }
    }
  
    return headers;
  }
  
}
