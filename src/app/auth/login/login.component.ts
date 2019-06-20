import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  submitted = false;
  message = "";
  // boolean for error message
  errorLogin = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _fb: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.errorLogin = false;
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(res => {
          if (res.statusCode === 200) {
            this.router.navigate(["room-list"]);
          } else if (res.statusCode === 400) {
            this.errorLogin = true;
            this.translate
              .get("LOGIN_REGISTER.InvalidCredential")
              .subscribe(trans => {
                this.message = trans;
              });
          } else {
            this.message = res.codeMessage;
          }
        });
    }
  }

  redirectToRegisterPage() {
    this.router.navigate(["register"]);
  }
}
