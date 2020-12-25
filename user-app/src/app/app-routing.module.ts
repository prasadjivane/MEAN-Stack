import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersCreateComponent } from './components/users-create/users-create.component';
import { UsersEditComponent } from './components/users-edit/users-edit.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-users' },
  { path: 'create-users', component: UsersCreateComponent },
  { path: 'edit-users/:id', component: UsersEditComponent },
  { path: 'users-list', component: UsersListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


