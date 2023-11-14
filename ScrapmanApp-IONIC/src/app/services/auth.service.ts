import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _loginURL=  environment.BASE_API_URL+"users/login";
  _registerURL=environment.BASE_API_URL+"users/register";

  constructor(private http:HttpClient) { }

  loginUser(req){
    return this.http.post(this._loginURL,req);
  }

  registerUser(req){
    return this.http.post(this._registerURL,req);
  }

  loggedIn(){
    return !!localStorage.getItem("token");
  }
}
