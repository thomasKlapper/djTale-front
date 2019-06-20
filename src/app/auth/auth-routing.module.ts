import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { IsLoggedOutGuard } from "./guards/isLoggedOutGuard";
import { AppComponent } from "../app.component";
import { IsLoggedInGuard } from "./guards/isLoggedInGuard";

const authRoutes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [IsLoggedOutGuard] },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [IsLoggedOutGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
