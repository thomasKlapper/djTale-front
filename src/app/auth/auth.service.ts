import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BackEndResponse } from '../../assets/classes/backendresponse';
import { AuthModule } from './auth.module';


@Injectable({
  providedIn: AuthModule
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router ) { }

  public login(email: string, password: string): Observable<BackEndResponse> {
    return this.http
      .post<BackEndResponse>(`${environment.backEndUrl}/${environment.auth.login}`, { email, password })
      .pipe(
        map(res => {
          window.localStorage.setItem('user', JSON.stringify(res.data.user));
          window.localStorage.setItem('jwt', res.data.jwt);
          return res;
        }),
        catchError((e): Observable<BackEndResponse> => {
          const res: BackEndResponse = e.error;
          return of(res);
        })
      );
  }

  public register(email: string, password: string, pseudo: string): Observable<BackEndResponse> {
    return this.http
      .post<BackEndResponse>(`${environment.backEndUrl}/${environment.auth.register}`, { email, password, pseudo })
      .pipe(
        map(res => {
          return res;
        }),
        catchError((e): Observable<BackEndResponse> => {
          const res: BackEndResponse = e.error;
          return of(res);
        })
      );
  }

  public getIdentity() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return {
      pseudo: user.pseudo,
      _id: user._id,
      email: user.email
    };
  }

  public logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('jwt');
    this.router.navigate(['auth/login']);
  }

}
