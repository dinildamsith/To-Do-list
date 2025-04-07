import { Component} from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { API_ENDPOINTS } from '../../../service/api-endpoints';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: 'signup.component.html',
  imports: [FormsModule]
})

export class SignupComponent{

  userData = {
      username: '',
      password: '',
      confirmPassword: ''
  }

  constructor(private api: ApiService, private router: Router) {}


  // Sign up handel
  onSignUp() {
    if (this.userData.password !== this.userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }


      // After navigation finishes
      this.api.post(API_ENDPOINTS.AUTH.SIGNUP, this.userData).subscribe({
        next: (response) => {
          console.log(response);
          alert("Sign up successful!");
          this.router.navigate(['/'])
        },
        error: (error) => {
          console.error(error);
          alert("Sign up failed. Please try again.");
        }
      });
  }

}
