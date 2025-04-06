import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignInComponent} from './pages/auth/signin/signIn.component';
import {TaskAddComponent} from './pages/addTaskPage/addTask.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent],
  templateUrl: './app.component.html',
  // styleUrl: ''
})
export class AppComponent {


}
