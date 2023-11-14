import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { HttpHeaders } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { HomeComponent } from 'src/app/fragments/home/home.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  status:any;
  statusColor:any;
  orderId:any;
  pickupDate:any;
  pickupTime:any;
  address:any;
  landmark: any;
  items:any;
  amount:any;
  orderBy_Name:any;
  orderBy_Mobile:any;
  received = true;
  headers:any;
  assignId:any;
  
  constructor(private apiService:ApiService,private activatedRoute:ActivatedRoute,private callNumber:CallNumber,private alertController:AlertController,private navController:NavController,private home:HomeComponent) { 

    var date_time = new Date();

    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year 
    let year = date_time.getFullYear();
    console.log(year+"-"+month+"-"+date);

    this.headers = new HttpHeaders();
    this.headers = this.headers.set("Authorization","Bearer "+sessionStorage.getItem('token'));
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.apiService.getAssignOrderDetails(id, this.headers).subscribe(order=>{
      console.log(order)
      if(order){
        this.assignId = order["_id"]
        console.log(order["orderDetails"].status)
        
        let statusCode = order["orderDetails"].status;
        switch(statusCode){
          case 2:
            this.statusColor = "danger";
            this.status = "cancel";
            break;
          case 3:
            this.statusColor = "secondary"
            this.status = "confirmed"
            break;
          case 4:
            this.statusColor = "primary"
            this.status = "on the way"
            break;
          case 5:
            this.statusColor = "success"
            this.status = "completed"
            this.received = false
            
          default:
            
        }
        this.orderId = order["orderDetails"].order_id;
        this.address = order["orderDetails"].location.address+","+order["orderDetails"].location.district+","+order["orderDetails"].location.state+","+order["orderDetails"].location.pincode;
        this.landmark = order["orderDetails"].location.landmark;

        this.pickupDate = order["pickup_date"];
        this.pickupTime = order["pickup_time"];

        this.items = order["orderDetails"].items
        let total = 0;
        order["orderDetails"].items.forEach(item=>{
          total += item.item_weight*item.item_price
        })
        this.amount = total;
        this.orderBy_Name = order["userDetails"].name;
        this.orderBy_Mobile = order["userDetails"].mobile;
      }
    })
  }
  handleCall(mobile:string){
    this.callNumber.isCallSupported().then(res=>{
      console.log(res);
      this.callNumber.callNumber(mobile,true).then(call=>{
        console.log(call)
      }).catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err);
    })
  }
  receiveOrder(){
    let id = this.assignId
    this.apiService.receiveOrder(id,this.headers).subscribe(data=>{
      console.log(data);
      if(data["status"]){
        this.statusColor = "success";
        this.status = "completed";
        this.received = false;
        this.home.getOrders();
        this.presentAlert(data["msg"]);
      }
    })
    console.log(id);
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Order Status',
      // subHeader: msg,
      message: "Order Received Successfully",
      buttons: ['OK'],
    });

    await alert.present();
  }

}
