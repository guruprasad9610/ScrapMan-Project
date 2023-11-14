import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BuffertodataService } from '../services/buffertodata.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  itemDatas;
  constructor(private http:HttpClient,private bufferArraytoData:BuffertodataService) {}
  ngOnInit(){
    this.getItems();
  }
  getItems(){
    let getItemsAPI = environment.BASE_API_URL+environment.ITEMS+"get-items";
    let headers = new HttpHeaders();
    let arr = Array();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    this.http.get(getItemsAPI,{headers:headers}).subscribe(data=>{
      // console.log(JSON.parse(JSON.stringify(data)).length);
      // this.itemDatas = data
      JSON.parse(JSON.stringify(data)).forEach(element => {
        console.log(element.item_img.data);
        arr.push({
                  "id":element._id,
                  "item_name":element.item_name,
                  "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(element.item_img.data.data),
                  "contentType":element.item_img.contentType,
                  "desp":element.item_img.desc,
                  "price":element.item_price});  
      });
      this.itemDatas = arr;
    })
  
  }
  addItemLocal(){
    
  }
}
