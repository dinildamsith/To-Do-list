import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string; // For example, username or user ID
  exp: number; // Expiration time of the token
  iat: number; // Issued at time
  roles?: string[]; // Optional roles if present in token
  [key: string]: any; // To capture any other dynamic fields
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private decodedToken: JwtPayload | null = null;

  constructor() {
    this.decodeToken();
  }

  private decodeToken(): void {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage (or any other secure storage)

    if (token) {
      try {
        this.decodedToken = jwtDecode<JwtPayload>(token);
        console.log('Decoded Token:', this.decodedToken);
      } catch (error) {
        console.error('Invalid Token:', error);
        this.decodedToken = null;
      }
    }
  }

  getDecodedToken(): JwtPayload | null {
    return this.decodedToken;
  }

  getUsername(): string | null {
    return this.decodedToken?.sub || null; // Extracting the 'sub' value (example: username)
  }

  getUserRoles(): string[] {
    return this.decodedToken?.roles || []; // Extracting the roles if available
  }

  isTokenExpired(): boolean {
    if (!this.decodedToken) return true;
    const exp = this.decodedToken.exp;
    return (Date.now() / 1000) > exp; // Check if the token has expired
  }
}
