import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      pseudo: ['', Validators.required]
    })
  }

  onSubmit() {
    this.errorMessage = "";
    this.snackBar.dismiss();
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.pseudo)
        .subscribe(res => {
          if (res.statusCode === 200) {
            this.openSnackBar('Success ! Redirecting to Login page ...', 2000)
            setTimeout(() => {
              this.redirectToLoginPage()
            }, 2000);
          } else {
            this.errorMessage = res.codeMessage;
            this.openSnackBar('Error ! ' + this.errorMessage, 5000)
          }
        });
    }
  }

  openSnackBar(text, duration) {
    this.snackBar.open(text, null, { duration, verticalPosition: 'top' })
  }

  redirectToLoginPage() {
    this.router.navigate(['auth/login']);
  }

}
