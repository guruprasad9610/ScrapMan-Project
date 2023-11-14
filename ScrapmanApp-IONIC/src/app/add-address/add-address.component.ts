import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit {
  name:String;
  country:String;
  district:String;
  state:String;
  address:String;
  pincode:String;
  landmark:String;
  location:any;
  constructor(private modalController:ModalController,private http:HttpClient) { }

  ngOnInit() {
    this.country='';
    this.state='';
    this.district='';
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.location = {
        "address":this.address,
        "landmark":this.landmark,
        "pincode":this.pincode,
        "lat":0,
        "long":0,
        "country":this.country,
        "state":this.state,
        "district":this.district
    }
    
    // this.http.post

    return this.modalController.dismiss(this.location, 'confirm');
  }

  getCountry(){
    console.log(this.country);
  }
  getState(){
    console.log(this.state);
  }
  getDistrict(){
    console.log(this.district);
  }

}
