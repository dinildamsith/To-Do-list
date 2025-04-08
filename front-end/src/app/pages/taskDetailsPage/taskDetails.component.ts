import { Component, OnInit  } from "@angular/core";
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ApiService } from '../../service/api.service'; 
import { API_ENDPOINTS } from '../../service/api-endpoints';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../../component/navbar/navbar/navbar.component";
import { LoadingSpinnerComponent } from "../../component/navbar/loading-spinner/loading-spinner.component";

@Component({
  selector: 'task-details',
  standalone: true,
  templateUrl: 'taskDetails.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NavbarComponent,
    LoadingSpinnerComponent
]
})


export class TaskDetailsComponent implements OnInit{

  selectedTask: any = null;

  constructor(private api: ApiService, private authService: AuthService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    console.log('Component Loaded ✅');
    this.loadTasks(); // Call your logic here
  }

  taskId: any = null
  isLoading: any = false
  loadTasks() {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    console.log('Task ID from URL:', this.taskId);

    const isAuth = true
    this.isLoading = true
    this.api.get(API_ENDPOINTS.TASK.ID_BY_TASK(this.taskId), isAuth).subscribe({
      next: (response:any) => {
              console.log(response);
              this.selectedTask = response.data
            },
            error: (error) => {
              this.isLoading = false;
              console.error(error);
            },
            complete: () => {
              this.isLoading = false; // Hide loading spinner
            }
    })

  }
}