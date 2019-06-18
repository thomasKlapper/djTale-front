import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthService } from "./auth.service";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material/app-material.module";

// import { JwtModule } from '@auth0/angular-jwt';

function getJwt() {
  return window.localStorage.getItem("jwt");
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    AppMaterialModule
    // JwtModule.forRoot({
    //     config: {
    //       tokenGetter: getJwt,
    //       whitelistedDomains: ['127.0.0.1:3333'],
    //       blacklistedRoutes: [
    //         '127.0.0.1:3333/auth/',
    //       ],
    //     }
    //   }),
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthService],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
