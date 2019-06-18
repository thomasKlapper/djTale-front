import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  submitted = false;
  errorMessage = "";
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = "";
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(res => {
          if (res.statusCode === 200) {
            console.log("Login success");
            this.router.navigate(["home"]);
          } else {
            this.errorMessage = res.codeMessage;
          }
        });
    }
  }

  redirectToRegisterPage() {
    this.router.navigate(["auth/register"]);
  }
}
