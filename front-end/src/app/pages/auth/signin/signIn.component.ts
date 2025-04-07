import { Component } from '@angular/core';
import {  FormsModule} from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { Router} from '@angular/router';
import { API_ENDPOINTS } from '../../../service/api-endpoints';

@Component({
  selector: 'app-signin',
  templateUrl: 'signIn.component.html',
  imports: [FormsModule]
})

export class SignInComponent {

  signInData = {
    username: '',
    password: ''
  }

  constructor(private api: ApiService, private router: Router) {}

  // Sign in handle
  onSignIn() {

    console.log(this.signInData)

    this.api.post(API_ENDPOINTS.AUTH.SIGNIN, this.signInData, false).subscribe({
      next: (res:any) => {
        console.log('Login success', res);
        localStorage.setItem('token', res.data); // save token if needed
        this.router.navigate(['/dash-bord']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Please check your email or password.');
      }
    });

  }

}
