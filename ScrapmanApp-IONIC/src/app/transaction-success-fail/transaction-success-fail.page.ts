import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction-success-fail',
  templateUrl: './transaction-success-fail.page.html',
  styleUrls: ['./transaction-success-fail.page.scss'],
})
export class TransactionSuccessFailPage implements OnInit {

  orderId:any;
  date:any;
  time:any;
  items:any;
  totalCost:any=0;

  constructor(private router:Router,public data:DataService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data=>{
      const results = JSON.parse(data["order"])
      console.log(results._id);
      this.orderId = results._id
      this.date = results.pickup_date;
      this.time = results.pickup_time;
      this.items = results.items;
      
      // console.log(results.items.length);

      results.items.forEach(data=>{
        // console.log(data.item_price)
        this.totalCost += data.item_price*data.item_weight;
      })
    })
  }
  goHome(){
    this.router.navigate(['/'])
  }

}
