import {Component} from '@angular/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: 'navbar.component.html',
})


export class NavbarComponent{

  logout() {
    // Clear user data from local storage or session storage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    // Optionally, you can handle more actions, like notifying the backend
  }

}
