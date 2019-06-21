import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth.service";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { Observable, forkJoin } from "rxjs";

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "src/assets/helpers/must-match.validator";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["../login/login.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message = "";
  action = "";
  // boolean for error message
  errorLogin = false;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router
  ) {}

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

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
      panelClass: ["snack-bar"]
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(["room-list"]);
    });
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
          if (res.statusCode === 200) {
            let messageTranslate = this.translate.get(
              "LOGIN_REGISTER.ValidRegisterMessage"
            );
            let actionTranslate = this.translate.get(
              "LOGIN_REGISTER.ValidRegisterAction"
            );
            forkJoin([messageTranslate, actionTranslate]).subscribe(results => {
              this.message = results[0];
              this.action = results[1];
            });
            this.openSnackBar(this.message, this.action);
          } else if (res.statusCode === 400) {
            // this.errorLogin = true;
            // this.translate
            //   .get("LOGIN_REGISTER.InvalidRegister")
            //   .subscribe(trans => {
            //     this.message = trans;
            //   });
          } else {
            this.message = res.codeMessage;
          }
        });
    }
  }
}
