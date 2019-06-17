import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

export function getJwt() {
    return window.localStorage.getItem('jwt');
}

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: getJwt,
              whitelistedDomains: ['127.0.0.1:3333'],
              blacklistedRoutes: [
                '127.0.0.1:3333/auth/',
              ],
            }
          }),
    ],
    declarations: [LoginComponent, RegisterComponent],
    providers: [AuthService],
    exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
