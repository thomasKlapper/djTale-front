import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "../auth/login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule]
})
export class AuthModule {}
