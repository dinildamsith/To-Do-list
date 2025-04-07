// src/app/task.service.ts

import { Injectable } from '@angular/core';
import { Task } from './mock-tasks'; // Assuming mock-tasks.ts is in the same directory

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];

  // Method to get all tasks
  getTasks() {
    return [...this.tasks]; // Return a copy of tasks
  }

  // Method to add a new task
  addTask(newTask: Task) {
    this.tasks.push(newTask);
  }

  // Method to delete a task by id
  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  // Method to update a task
  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
    }
  }
}
