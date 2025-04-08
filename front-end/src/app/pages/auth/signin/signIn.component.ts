import { Component } from '@angular/core';
import {  FormsModule} from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { Router} from '@angular/router';
import { API_ENDPOINTS } from '../../../service/api-endpoints';
import { LoadingSpinnerComponent } from '../../../component/navbar/loading-spinner/loading-spinner.component';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: 'signIn.component.html',
  imports: [FormsModule, LoadingSpinnerComponent, NgIf],
})

export class SignInComponent {

  signInData = {
    username: '',
    password: ''
  }

  constructor(private api: ApiService, private router: Router) {}

  isLoading = false;
  // Sign in handle
  onSignIn() {

    console.log(this.signInData)

    this.isLoading = true; // Show spinner
    this.api.post(API_ENDPOINTS.AUTH.SIGNIN, this.signInData, false).subscribe({
      next: (res:any) => {
            Swal.fire({
                    icon: 'success',
                    title: "Sign In Success."
                  });
        console.log('Login success', res);
        localStorage.setItem('token', res.data); // save token if needed
        this.router.navigate(['/dash-bord']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed', err);
            Swal.fire({
                            icon: 'error',
                            title: err.error.responseMessage
                          });
      },
      complete: () => {
        this.isLoading = false; // Hide spinner
      }
    });

  }

}
