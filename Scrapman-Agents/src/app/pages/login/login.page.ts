import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailInput:string;
  passwordInput:String;
  error:boolean=false

  constructor(private authService:AuthService,private router:Router,private menuCtrl:MenuController,private appComponent:AppComponent,private loadingCtrl:LoadingController,private toastController:ToastController,private navCtrl:NavController) { }

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.router.navigate(['']);
    }
    localStorage.setItem("check","true")
  }
  
  onSubmit(){
    let req = {
      "email":this.emailInput,
      "password":this.passwordInput
    };
    
    // this.presentToast("bottom",JSON.stringify(req))
    this.showLoading()
    
    // this.router.navigate(['folder/Home']);

    this.authService.loginUser(req).subscribe(data=>{
        console.log(data["status"]);
        if(data["status"]==true && data["userType"]==2){
          this.appComponent.disable = false;
          this.appComponent.email = data['email'];
          sessionStorage.setItem('token',data['token']);
          sessionStorage.setItem('uid',data['_id']);
          this.router.navigate(['']);
          // this.navCtrl.navigateForward([''])
          // window.location.reload();
          
        }else{
          this.error = true;
        }
    })
  }
  handleChange(){
    this.error=false;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: position
    });

    await toast.present();
  }

  async showLoading(){
    const loading = await this.loadingCtrl.create({
      message:'Please wait',
      duration:3000,
    });
    loading.present();
   }

}
