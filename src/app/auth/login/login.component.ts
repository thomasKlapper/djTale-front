import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.errorMessage = "";
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(res => {
        if(res.statusCode === 200) {
          console.log("Login success");
          this.router.navigate(['home']);
        } else {
          this.errorMessage = res.codeMessage;
        }
      });
    }
  }

  redirectToRegisterPage() {
    this.router.navigate(['auth/register']);
  }

}
