import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDataComponent } from './user-data/user-data.component';
import { RouteGuardService } from './route-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/new',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/:id/edit', //:id permette di catturare tutto quello che si trova, in questo caso, tra users ed edit, per leggere correttamente il path quando utilizzo i
    component: UserDetailComponent,
    canActivate: [RouteGuardService] 
  },
  {
    path: 'users/:id', //:id permette di catturare tutto quello che si trova, in questo caso, tra users ed edit
    component: UserDataComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
  ],

  exports: [
    RouterModule
  ]

})
export class RoutingModuleModule { }

