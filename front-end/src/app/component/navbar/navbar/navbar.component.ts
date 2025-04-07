import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: 'navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ]
})


export class NavbarComponent{

  constructor(private router: Router) {}

  logout() {
    // Clear user data from local storage
    localStorage.removeItem('token');
  

    // Navigate to login or default route
    this.router.navigate(['/']);
  }

}
