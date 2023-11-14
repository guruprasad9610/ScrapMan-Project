import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {

  orderId:String;
  date:String;
  time:String;
  items:any;
  totalCost=0;
  orderStatus:any;
  orderProgress:any;

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((data)=>{
      this.orderId = ""+data.get('orderId');
      console.log(data.get('orderId'))
    })
    this.getOrderDetails();
  }

  getOrderDetails(){
    let headers = new HttpHeaders();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    this.http.get(environment.BASE_API_URL+environment.ORDERS+this.orderId,{headers:headers}).subscribe(results=>{
      console.log(results);
      // const results = JSON.parse(data["order"])
      let order = this.getProgressByStatus(results["status"]);
      this.orderStatus = order.status;
      this.orderProgress = order.progress;
      
      console.log(results["_id"]);
      this.orderId = results["_id"];
      if(results["pickup_date"] && results["pickup_time"]){

        let onlyTime = results["pickup_time"]
        this.time = onlyTime[0];
      }
      this.date = results["pickup_date"];
      this.items = results["items"];
      
      // console.log(results.items.length);

      console.log(this.orderStatus);

      if(results["items"].length>0){
        let cost = 0;
        results["items"].forEach(data=>{
          // console.log(data.item_price)
          this.totalCost += data.item_price*data.item_weight;
          
        })
      }
      
    })
  }

  getProgressByStatus(status){
    switch(status){
      case -1:
        return { "progress":0,"status":"Draft" };
      case 0:
        return { "progress":0.2,"status":"Placed" };
      case 1:
        return { "progress":0.4,"status":"Confirmed" };
      case 2:
        return { "progress":0,"status":"Cancelled" };
      case 3:
        return { "progress":0.6,"status":"Confirmed" };
      case 4:
        return { "progress":0.8,"status":"On the way" };
      case 5:
        return { "progress":1,"status":"Completed" };
    }
  }

}
