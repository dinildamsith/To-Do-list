import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  // styleUrl: ''
})
export class AppComponent {

  // constructor(private api: ApiService) {}

  // ngOnInit() {
  //   this.api.get<any>('tasks').subscribe({
  //     next: (res) => console.log('Tasks:', res),
  //     error: (err) => console.error('Error loading tasks', err)
  //   });
  // }
}
