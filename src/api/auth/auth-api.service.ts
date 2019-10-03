import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginRequest } from '../entities/login-request.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Request an OpenId Authentication.
   */
  public login(loginRequest: LoginRequest): Observable<any> {
    console.log(`${AuthApiService.name}::login credentials %o`, loginRequest);
    const url = 'https://auth.zwitcher.com/connect/token';

    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    };

    // URLSearchParams normalized the params of the form and the pipes dimiss.
    const body = new URLSearchParams();
    body.set('client_id', 'traslada.operators');
    body.set('grant_type', 'password');
    body.set('password', loginRequest.password);
    body.set('scopes', null);
    body.set('username', loginRequest.username);

    return this.httpClient.post(url, body.toString(), httpOptions);
  }

}
