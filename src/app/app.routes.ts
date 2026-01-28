import { Routes } from '@angular/router';
import {UsersListComponent} from './users/users-list/users-list';
import {UsersDetailsComponent} from './users/users-details/users-details';

export const routes: Routes = [
  {
    path: '', redirectTo: 'users', pathMatch: 'full'
  },
  {
    path: 'users', component: UsersListComponent
  },
  {
    path: 'users/:login', component: UsersDetailsComponent
  }
];
