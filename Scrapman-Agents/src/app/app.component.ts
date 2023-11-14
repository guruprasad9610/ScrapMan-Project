import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Profile', url: '/folder/Profile', icon: 'person' },
    { title: 'Orders', url: '/folder/Orders', icon: 'bag-check' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  disable:boolean = false;
  email:string = "";
  constructor(private alertController:AlertController,private router:Router,private menuCtrl:MenuController,private authService:AuthService,private activatedRoute:ActivatedRoute) {
    if(authService.loggedIn()){
      this.disable = false
    }else{
      this.disable = true
      // this.authService.getUser(sessionStorage.getItem("uid")).subscribe(res=>{
      //   if(res["status"]){
      //     this.email = res["data"]["email"]
      //   }
      // })
    }
    console.log(authService.loggedIn());
  }

  async logoutAlert() {
    if (this.menuCtrl.isOpen()) {
      this.menuCtrl.close();
      this.menuCtrl.enable(false);
    }
    const alert = await this.alertController.create({
      header: 'Logout',
      message:"Are you sure to Logout?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.menuCtrl.close();
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.disable = true;
            this.menuCtrl.close();
            sessionStorage.clear();
            this.router.navigate(['login']);
            // window.location.reload();
          },
        },
      ],
    });

    await alert.present();

  }
}
