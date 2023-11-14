import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name:string="";
  email:string="";
  password:string="";
  confirm_password:string="";
  mobile:string="";

  constructor(private toastController:ToastController,private authService:AuthService,private router:Router) { }

  ngOnInit() {

  }

  onSubmit(){
    if(this.password == this.confirm_password){
      let req = {
        "name":this.name,
        "email":this.email,
        "mobile":this.mobile,
        "password":this.password
      };

      this.authService.registerUser(req).subscribe(data=>{
        console.log(data);
        if(data){
          this.presentToast('top',"Registration Successfull")
          this.router.navigate(['login'])
        }
      });

    }else{
      this.presentToast('top',"Password didn't match");
    }
    
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
