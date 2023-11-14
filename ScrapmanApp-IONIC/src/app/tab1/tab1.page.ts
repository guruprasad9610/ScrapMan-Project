import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BuffertodataService } from '../services/buffertodata.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  n=[1,2,3,4,5,6,7,8,9,10];
  itemDatas;
  constructor(private router:Router,private http:HttpClient, private bufferArraytoData:BuffertodataService) {

  }
  ngOnInit(){
    // this.goToTab3();
    this.getItems();
  }
  goToTab3(){
    console.log("Clicked")
    this.router.navigate(['sell-trash'])
  }

  logScrollStart(){ }

  logScrolling(event:Event)
  {
    console.log(event.target)
  }
  logScrollEnd(){ }

  
  getItems(){
    let getItemsAPI = environment.BASE_API_URL+environment.ITEMS+"get-items";
    let headers = new HttpHeaders();
    let arr = Array();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    this.http.get(getItemsAPI,{headers:headers}).subscribe(data=>{
      // console.log(JSON.parse(JSON.stringify(data)).length);
      // this.itemDatas = data
      JSON.parse(JSON.stringify(data)).forEach(element => {
        // console.log(element.item_img);
        // this.arrayBufferToBase64(element.item_img.data.data)
        console.log(this.bufferArraytoData.arrayBufferToBase64(element.item_img.data.data));
        arr.push({"item_name":element.item_name,
                  "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(element.item_img.data.data),
                  "contentType":element.item_img.contentType,
                  "desp":element.item_img.desc,
                  "price":element.item_price});
      });
      this.itemDatas = arr;
    })

  }
  arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    console.log(binary);
    return binary;
  }

}
