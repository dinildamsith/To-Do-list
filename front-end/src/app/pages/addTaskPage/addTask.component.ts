import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../../component/navbar/navbar/navbar.component';
import { CommonModule, NgIf } from '@angular/common';
import { ApiService } from '../../service/api.service'; 
import { API_ENDPOINTS } from '../../service/api-endpoints';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { LoadingSpinnerComponent } from "../../component/navbar/loading-spinner/loading-spinner.component";
@Component({
  selector: 'app-task-add',
  standalone: true,
  templateUrl: 'addTask.component.html',
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, LoadingSpinnerComponent, NgIf],
})
export class TaskAddComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private authService: AuthService ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required,Validators.maxLength(500)]],
      status: ['TO_DO',Validators.required], // default value
    });
  }


  //--------------------NEW TASK CREATE HANDEL
  isLoading = false;
  onSubmit(): void {
    if (this.taskForm.valid) {
      //------token get
      const decodeToken:any = this.authService.getDecodedToken()
      // ------ task data collect
      const taskData = {
        userId: decodeToken.userid,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        createAt: new Date().toISOString(), // Add the current date and time
        
      }

     //---------call api to add task
     const isAuth = true;
      this.isLoading = true; // Show loading spinner
      this.api.post(API_ENDPOINTS.TASK.CREATE, taskData, isAuth).subscribe({
        next: (response: any) => {
               Swal.fire({
                    icon: 'success',
                    title: 'New Task Add Successfully'
                  });
          console.log('Task added successfully:', response);
          this.taskForm.reset(); // Reset the form after successful submission
        },
        error: (error) => {
          this.isLoading = false; // Hide loading spinner
          console.error('Error adding task:', error);
          // Handle error response
        }, 
        complete: () => {
          this.isLoading = false; // Hide loading spinner
        }
      })
    } else {
      this.taskForm.markAllAsTouched(); // show validation errors
    }
  }
}
