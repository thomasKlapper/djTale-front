import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  submitted = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  // onSubmit() {
  //   this.errorMessage = "";
  //   if(this.loginForm.valid){
  //     this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
  //     .subscribe(res => {
  //       if(res.statusCode === 200) {
  //         console.log("Login success");
  //         this.router.navigate(['home']);
  //       } else {
  //         this.errorMessage = res.codeMessage;
  //       }
  //     });
  //   }
  // }

  redirectToRegisterPage() {
    this.router.navigate(['auth/register']);
  }

}
