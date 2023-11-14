import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string="";
  password:string="";

  constructor
  (
    private http:HttpClient,
    private router:Router,
    private authService:AuthService,
    private toastController:ToastController,
    private loadingCtrl:LoadingController
  ) { }

  ngOnInit()
  {
    if(this.authService.loggedIn())
    {
      this.router.navigate(['/']);
    }
  }

  onSubmit()
  {
    this.showLoading();

    let req = {
      "email":this.email,
      "password":this.password
    };

    this.authService.loginUser(req).subscribe(data=>{
        console.log(data);
        // this.loadingCtrl.dismiss();
        if(data['status'])
        {
          localStorage.setItem('token',data['token']);
          localStorage.setItem('uid',data['_id']);
          this.router.navigate(['/']);
        }
        else
        {
          this.presentToast('bottom')
        }
    })

  }

  async presentToast(position: 'top' | 'middle' | 'bottom')
  {
    const toast = await this.toastController.create({
      message: 'Invalid Email and Password',
      duration: 1500,
      position: position
    });
    await toast.present();
  }

  async showLoading()
  {
    const loading = await this.loadingCtrl.create({
      message:'Please wait',
      duration:3000,
    });
    loading.present();
  }

}
