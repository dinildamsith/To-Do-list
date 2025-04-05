import { Routes } from '@angular/router';
import {SignupComponent} from './pages/auth/signup/signup.component';
import {SignInComponent} from './pages/auth/signin/signIn.component';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signup', component: SignupComponent },
];
