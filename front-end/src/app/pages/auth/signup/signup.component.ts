import { Component, NgModule} from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { API_ENDPOINTS } from '../../../service/api-endpoints';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../component/navbar/loading-spinner/loading-spinner.component';
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: 'signup.component.html',
  imports: [FormsModule, CommonModule, LoadingSpinnerComponent, NgIf],
})

export class SignupComponent{

  userData = {
      username: '',
      password: '',
      confirmPassword: ''
  }

  constructor(private api: ApiService, private router: Router) {}

  isLoading = false;
  // Sign up handel
  onSignUp() {
    if (this.userData.password !== this.userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }


     this.isLoading = true; // Show loading spinner
      // After navigation finishes
      this.api.post(API_ENDPOINTS.AUTH.SIGNUP, this.userData, false).subscribe({
        next: (response) => {
          console.log(response);
          alert("Sign up successful!");
          this.router.navigate(['/'])
        },
        error: (error) => {
          this.isLoading = false;
          console.error(error);
          alert("Sign up failed. Please try again.");
        },
        complete: () => {
          this.isLoading = false; // Hide loading spinner
        }
      });
  }

}
