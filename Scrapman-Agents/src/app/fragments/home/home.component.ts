import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  username:String
  list = [1,2,3,4,5,6,7,8,9];
  type = "pending";
  pendingOrders:any = Array();
  completedOrders:any = Array();
  todaysDate:any
  dateString:any
  headers:any
  constructor(private authService:AuthService,private appComponent:AppComponent,private apiService:ApiService,private navCtrl:NavController) {
    var date_time = new Date();

    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    console.log(date_time);
    let dateArr = date_time.toString().split(" ");
    this.dateString = dateArr[0]+","+dateArr[1]+" "+dateArr[2]+" "+dateArr[3]+" "+dateArr[4];
    this.todaysDate = date+"-"+month+"-"+year;
    this.headers = new HttpHeaders();
    this.headers = this.headers.set("Authorization","Bearer "+sessionStorage.getItem('token'));
  }

  ngOnInit() {
    // this.authService.getUser(sessionStorage.getItem('uid'),this.headers);

    this.authService.getUser(sessionStorage.getItem('uid'),this.headers).subscribe(user=>{
      this.appComponent.email = user["data"].email
      this.username = user["data"].name
      console.log(user["data"].name);
    })
    // this.username = "Rana Karmakar"

    this.getOrders();

  }

  getOrders(){
    this.apiService.getAssignedOrders(sessionStorage.getItem('uid'),"false","",this.todaysDate,this.headers).subscribe(orders=>{
      console.log(orders);
      this.pendingOrders = orders
    })
    this.apiService.getAssignedOrders(sessionStorage.getItem('uid'),"true","",this.todaysDate,this.headers).subscribe(orders=>{
      console.log(orders);
      this.completedOrders = orders
    })
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
  segmentChanged(event){
    console.log(event.detail.value);
    console.log(this.segment);
    this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  orderDetails(id){
    this.navCtrl.navigateForward(["order-details/"+id])
  }

}
