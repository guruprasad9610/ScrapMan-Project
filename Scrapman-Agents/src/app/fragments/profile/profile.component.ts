import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  agentName:any;
  agentEmail:any;
  headers:any;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set("Authorization","Bearer "+sessionStorage.getItem('token'));
    this.authService.getUser(sessionStorage.getItem("uid"),this.headers).subscribe(user=>{
      this.agentName = user["data"].name
      this.agentEmail = user["data"].email
    })
  }

}
