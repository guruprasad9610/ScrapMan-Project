import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  orders:any;
  orderArr:any=Array();
  headers:any;
  constructor(private alertController: AlertController, private apiService:ApiService,private navCtrl:NavController) { }

  ngOnInit() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set("Authorization","Bearer "+sessionStorage.getItem('token'));
    this.apiService.getAssignedOrders(sessionStorage.getItem('uid'),"","","",this.headers).subscribe(data=>{
      console.log(data);
      // data.forEach(element => {
        
      // });
      this.orderArr = data;
      let array = Array();
      this.orderArr.forEach(element => {
        array.push(element);
      });
      this.orders=array.reverse();
      console.log(array);
    })

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }
  }
  orderDetails(id){
    this.navCtrl.navigateForward(["order-details/"+id])
  }

}
