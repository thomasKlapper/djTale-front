import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../app/auth/login/login.component";
import { RegisterComponent } from "../app/auth/register/register.component";
import { IsLoggedOutGuard } from './auth/guards/isLoggedOutGuard';
import { IsLoggedInGuard } from './auth/guards/isLoggedInGuard';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [IsLoggedOutGuard]
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [IsLoggedOutGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
