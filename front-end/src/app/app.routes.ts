import { Routes } from '@angular/router';
import {SignupComponent} from './pages/auth/signup/signup.component';
import {SignInComponent} from './pages/auth/signin/signIn.component';
import {DashboardComponent} from './pages/dashbord/dashboard.component';
import {TaskAddComponent} from './pages/addTaskPage/addTask.component';
import { TaskDetailsComponent } from './pages/taskDetailsPage/taskDetails.component';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dash-bord', component: DashboardComponent},
  { path: 'add-task', component: TaskAddComponent},
  { path: 'task-summary/:id', component: TaskDetailsComponent},
];
