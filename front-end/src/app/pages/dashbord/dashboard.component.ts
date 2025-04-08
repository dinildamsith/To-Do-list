// src/app/dashboard/dashboard.component.ts

import {Component, NgModule, OnInit} from '@angular/core';
import { TaskService } from '../../service/task.service'; 
import { Task } from '../../service/mock-tasks';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgClass, NgForOf, NgIf} from '@angular/common';
import {NavbarComponent} from '../../component/navbar/navbar/navbar.component';
import { ApiService } from '../../service/api.service'; 
import { API_ENDPOINTS } from '../../service/api-endpoints';
import { AuthService } from '../../service/auth.service';
import { LoadingSpinnerComponent } from '../../component/navbar/loading-spinner/loading-spinner.component';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: 'dashboard.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf,
    NavbarComponent,
    LoadingSpinnerComponent
  ]
})


export class DashboardComponent implements OnInit {

  isLoading = false;
  tasks: Task[] = [];
  allCount: number = 0;
  toDoCount: number = 0;
  inProgressCount: number = 0;
  doneCount: number = 0;
  searchTerm: string = '';
  showForm: boolean = false;
  taskForm: Task = { id: 0, title: '', description: '', status: 'TO_DO' }; // for new or edit task
  editingTask: Task | null = null;

  constructor(private api: ApiService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadDashboardData(); // Load tasks from the API
  }

  // load Dashboard data & all tasks api
  loadDashboardData() {
      const decodeToken:any = this.authService.getDecodedToken()
      const isAuth = true;
      this.isLoading = true; // Show loading spinner
      this.api.get(API_ENDPOINTS.TASK.GET_ALL(decodeToken.userid), isAuth).subscribe({
        next: (response:any) => {
          this.tasks = response.data;
          console.log(this.tasks);
          this.calculateTaskCounts();
        },
        error: (error) => {
          this.isLoading = false;
          console.error(error.error.responseCode);
          if (error.error.responseCode === '404') {
            this.tasks = []; // Clear tasks if error occurs
          }
        },
        complete: () => {
          this.isLoading = false; // Hide loading spinner
        }
      })
  }

  // update task api call
  updateTask() {
    console.log(this.taskForm);

    const isAuth = true;

    this.isLoading = true; // Show loading spinner
    this.api.put(API_ENDPOINTS.TASK.UPDATE(this.taskForm.id), this.taskForm, isAuth).subscribe({
      next: (response:any) => {
        this.showForm = false; // Close the form after saving
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Task Updated Successfully'
        });
        this.loadDashboardData(); // Reload tasks after update
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

  
  // Delete a task api call
  deleteTask(id: number) {
    
    const isAuth = true;

    this.isLoading = true; // Show loading spinner
    this.api.delete(API_ENDPOINTS.TASK.DELETE(id),isAuth).subscribe({
      next: (response:any) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Task Delete Successfully'
        });
        this.loadDashboardData(); // Reload tasks after update
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

  // Filter tasks based on search term
  filteredTasks() {
    console.log(this.searchTerm); // Check the search term
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



  // Edit a task button click after pop up window open and data set
  editTask(task: Task) {
    this.showForm = true;
    this.taskForm = { ...task }; // copy the task data
    this.editingTask = task;
  }


  // Close the form modal
  closeForm() {
    this.showForm = false;
    this.editingTask = null;
  }

  // Calculate task counts based on status
  calculateTaskCounts() {
    this.allCount = this.tasks.length;
    this.toDoCount = this.tasks.filter(task => task.status === 'TO_DO').length;
    this.inProgressCount = this.tasks.filter(task => task.status === 'IN_PROGRESS').length;
    this.doneCount = this.tasks.filter(task => task.status === 'DONE').length;
  }

  //
  copyToClipboard(text: any) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Task ID copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  //
  viewDetails(taskId: any) {
    this.router.navigate(['task-summary/'+taskId])
    console.log(taskId)
  }
  

  protected readonly navigator = navigator;
}
