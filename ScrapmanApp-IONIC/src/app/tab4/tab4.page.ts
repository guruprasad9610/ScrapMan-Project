import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  order_date:any;
  order_id:any;
  order_items:any;
  order_arr:any;
  orders:any = Array();

  constructor(private http:HttpClient,private router:Router,private toastController:ToastController) {
    this.getOrders();
    
    // this.presentToast("top","launch")
  }
  

  ngOnInit() {
    this.getOrders();
    // this.presentToast("top","launch")
  }

  getOrders(){
    const req = { "user_id":localStorage.getItem('uid') };
    let headers = new HttpHeaders();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    this.http.post(environment.BASE_API_URL+environment.ORDERS+"get-order-by-userid",req,{headers:headers}).subscribe(data=>{
      console.log(data)
      let odrArr = Array();
      this.order_arr=data
      this.order_arr.forEach(element => {
        let createdAt = element.createdAt;
        let datetime = createdAt.split("T");
        let items = "";
        element.items.forEach(item=>{
          items += item.item_name+", ";
        })
        
        let orderObj = {
          "id":element._id,
          "items":items,
          "ordered_on":datetime[0]
        }
        console.log(element.createdAt);
        odrArr.push(orderObj);
        
      });
      this.orders = odrArr.reverse();
    })
  }
  goToOrderDetails(id){
    this.router.navigate(['my-order-details/'+id]);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',msg) {
    const toast = await this.toastController.create({
      message: 'Invalid Email and Password',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
