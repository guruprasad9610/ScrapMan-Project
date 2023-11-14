import { formatDate } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild,Inject,LOCALE_ID } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
// import { format } from 'path';
import { AddAddressComponent } from '../add-address/add-address.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.page.html',
  styleUrls: ['./pickup.page.scss'],
})
export class PickupPage implements OnInit {
  data:any;
  myDate: any;
  minDate: any;
  maxDate: any;
  datesArray = [];
  location:any;
  oid:any;
  isWeekday:any;
  my_date:any;
  slotsArr:any=[];
  selectedDate:any;
  selectedTime:any;

  constructor(private activatedRoute:ActivatedRoute,public navController:NavController,private modalController: ModalController,private router:Router,@Inject(LOCALE_ID) public locale,private http:HttpClient,public dataService:DataService) {
    this.activatedRoute.paramMap.subscribe(

      (data) => {

        console.log(data.get("orderId"));
        this.oid = data.get("orderId");

      }

    );
   }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.paramMap.get("orderId");
    this.myDate = formatDate(Date.now(),'yyyy-MM-ddTHH:mm:ss',this.locale);
    // this.myDate = Date.now().toLocaleString();
    console.log(this.myDate);

    this.selectedDate = this.getDate();

    this.getSlots(this.getDate());


    this.isWeekday = (dateString: string) => {
      const date = new Date(dateString);
      const utcDay = date.getUTCDay();
  
      /**
       * Date will be enabled if it is not
       * Sunday or Saturday
       */
      return utcDay !== 0 && utcDay !== 6;
    };
  }

  setDate() {
    // this.minDate = this.myDate;
    // this.datesArray.push(this.myDate);
    // console.log(this.minDate);
    // console.log(this.getDate());
    this.getSlots(this.getDate());
    this.selectedDate = this.getDate();
  }

  goBack(){
    this.navController.pop()
    this.navController.back()
  }
  openDateTimePicker(){
    console.log("clicked date and time")
  }

  getDate(){
    let datetimeArr = this.myDate.split("T");
    let dateArr = datetimeArr[0].split("-")
    let dateReq = dateArr[2]+"-"+dateArr[1]+"-"+dateArr[0]
    return dateReq;
  }

  getSlots(dateReq){
    // let dateReq = this.getDate()
    
    console.log(dateReq);
    let headers = new HttpHeaders();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    this.http.post(environment.BASE_API_URL+environment.SLOTS+"getSlotsByDate",{
      "date":dateReq
  },{headers:headers}).subscribe(
    data=>{
      console.log(data)
      this.slotsArr = data
    }
  )
    
  }

  selectSlot(time){
    console.log(time);
    this.selectedTime = time;
  }

  async addAddressModal() {
    const modal = await this.modalController.create({
      component: AddAddressComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    // const modalData = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
      // console.log(modalData);
      this.location = data
    }
  }
  placeOrder(){
    let date = (this.myDate.toLocaleString()).split("T")
    const req = {
      "pickup_date":this.selectedDate,"pickup_time":this.selectedTime,"location":this.location,"order_id":this.oid
    }
    console.log(req)
    let headers = new HttpHeaders();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    this.http.post(environment.BASE_API_URL+environment.ORDERS+"place-order",req,{headers:headers}).subscribe(data=>{
      console.log(data);
      if(data["status"]==true){
        // this.dataService.setData(data["order"])
        console.log(data["order"]);
        this.router.navigate(['/transaction',{"order": JSON.stringify(data["order"])}])
        
      }else{
        
      }
    })
  }

}
