import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-add',
  standalone: true,
  templateUrl: 'addTask.component.html',
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
})
export class TaskAddComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      status: ['TO_DO'], // default value
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      console.log('Task submitted:', this.taskForm.value);
      // TODO: Add logic to send data to backend or service
    } else {
      this.taskForm.markAllAsTouched(); // show validation errors
    }
  }
}
