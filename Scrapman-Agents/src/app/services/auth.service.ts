import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _loginURL=environment.BASE_API_URL+"users/login";
  _registerURL=environment.BASE_API_URL+"register";
  _getUserById=environment.BASE_API_URL+"users/";
  headers:any;

  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders();
    // this.headers = this.headers.set("Authorization","Bearer "+sessionStorage.getItem('token'));
  }

  loginUser(req){
    return this.http.post(this._loginURL,req);
  }

  registerUser(req){
    return this.http.post(this._registerURL,req);
  }

  getUser(id,header){
    // this.headers = this.headers.set("Authorization","Bearer "+token);
    return this.http.get(this._getUserById+id,{headers:header});
  }

  loggedIn(){
    return !!sessionStorage.getItem("token");
    // return true;
  }
}
