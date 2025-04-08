import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: 'task-card.component.html',
  imports: [
    NgClass
  ]
})
export class TaskCardComponent {
  @Input() task: any;

  @Output() view = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  onView() {
    this.view.emit(this.task.id);
  }

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}
