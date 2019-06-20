import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth.service";

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "src/assets/helpers/must-match.validator";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["../login/login.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private _fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.registerForm = this._fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        pseudo: [null, [Validators.required, Validators.minLength(3)]],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.pseudo
        )
        .subscribe(res => {
          console.log(res);
          // if (res.statusCode === 200) {
          //   this.router.navigate(["home"]);
          // } else if (res.statusCode === 400) {
          //   this.errorLogin = true;
          //   this.translate
          //     .get("LOGIN_REGISTER.InvalidCredential")
          //     .subscribe(trans => {
          //       this.message = trans;
          //     });
          // } else {
          //   this.message = res.codeMessage;
          // }
        });
    }
  }
}
