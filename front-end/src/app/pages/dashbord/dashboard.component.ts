// src/app/dashboard/dashboard.component.ts

import {Component, NgModule, OnInit} from '@angular/core';
import { TaskService } from '../../service/task.service'; // Adjust path if necessary
import { Task } from '../../service/mock-tasks';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgClass, NgForOf, NgIf} from '@angular/common';
import {NavbarComponent} from '../../component/navbar/navbar.component';



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
  ]
})


export class DashboardComponent implements OnInit {

  tasks: Task[] = [];
  allCount: number = 0;
  pendingCount: number = 0;
  completedCount: number = 0;
  searchTerm: string = '';
  showForm: boolean = false;
  taskForm: Task = { id: 0, title: '', description: '', status: 'pending' }; // for new or edit task
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    console.log(this.tasks); // Check if tasks are being retrieved correctly
    this.calculateTaskCounts();
  }


  // Filter tasks based on search term
  filteredTasks() {
    console.log(this.searchTerm); // Check the search term
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  // Open form for new task
  openNewTask() {
    this.showForm = true;
    this.taskForm = { id: 0, title: '', description: '', status: 'pending' };
    this.editingTask = null;
  }

  // Edit a task
  editTask(task: Task) {
    this.showForm = true;
    this.taskForm = { ...task }; // copy the task data
    this.editingTask = task;
  }

  // Save new or edited task
  saveTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.taskForm);
    } else {
      const newTask = { ...this.taskForm, id: Date.now() }; // Use timestamp for unique id
      this.taskService.addTask(newTask);
    }
    this.closeForm();
    this.calculateTaskCounts();  // Ensure the counts are recalculated
  }


  // Close the form modal
  closeForm() {
    this.showForm = false;
    this.editingTask = null;
  }

  // Delete a task
  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.calculateTaskCounts();
  }

  // Calculate task counts based on status
  calculateTaskCounts() {
    this.allCount = this.tasks.length;
    this.pendingCount = this.tasks.filter(task => task.status === 'pending').length;
    this.completedCount = this.tasks.filter(task => task.status === 'completed').length;
  }

  protected readonly navigator = navigator;
}
