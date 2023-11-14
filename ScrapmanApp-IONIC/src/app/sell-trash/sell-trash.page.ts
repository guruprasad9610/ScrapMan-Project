import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions,NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { NavController, NavParams } from '@ionic/angular';
// import { PickupPage } from '../pickup/pickup.page';
import { ToastController } from '@ionic/angular';
import { LocationService } from '../services/location.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BuffertodataService } from '../services/buffertodata.service';

@Component({
  selector: 'app-sell-trash',
  templateUrl: './sell-trash.page.html',
  styleUrls: ['./sell-trash.page.scss'],
})
export class SellTrashPage implements OnInit {

  filterTerm:string="";
  suggest:boolean=false;
  itemDatas:any = Array();
  tempDatas:any = Array();
  userDatas:any;
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  weightInput= 0;
  itemId='';
  itemWeight='';
  itemReq:any=Array();
  count = 0;
  totalPrice = 0;
  constructor(
    private router:Router,
    private geolocation:Geolocation,
    private nativeGeocoder:NativeGeocoder,
    public navParams:NavParams,
    public navController:NavController,
    public toastController:ToastController,
    public locationService:LocationService,
    private http:HttpClient,
    private bufferArraytoData:BuffertodataService
  ) { }

  ngOnInit() {
    // this.getCoordinates();
    // this.itemDatas.clear();
    this.getItems();
  }

  goBack(){
  }

  handleChange(event){
    console.log(event.target.value)
    const query = event.target.value;
    if(query == ""){
      this.suggest = false;
    }
    this.itemDatas = this.itemDatas.filter(d => d.name.toLowerCase().indexOf(query) > -1);
  }

  getCoordinates(){
    this.geolocation.getCurrentPosition().then((resp)=>{
      console.log(resp)
      let location_data = this.locationService.reverseGeocoder(resp.coords.latitude,resp.coords.longitude)
      console.log(location_data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  getAddress(lat,long){
    const address = this.locationService.reverseGeocoder(lat,long)
    console.log(address)
    this.presentToast('middle',address)
  }
  logScrollStart(){

  }
  logScrolling(event){
    // console.log(event.target)
  }
  logScrollEnd(){

  }
  validiate(){
    const current = new Date();
    const currentTime = current.getTime()
    console.log(currentTime)
    let orderId = currentTime

    if(this.checkAddress()>0){
      // this.router.navigate(['pickup/1'])
    }else{
      this.router.navigate(['/pickup/'+orderId])
    }
  }
  checkAddress(){
    return 0
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  selectOptions(option_id,option_name){
    this.filterTerm = option_name;
    console.log(this.filterTerm+"-"+option_id);
    this.itemId = option_id
    this.suggest = false;
  }

  suggestbox()
  {
    this.suggest = true
    // this.getItems();
  }
  hideSuggestBox(){
    // this.suggest = false
  }
  getPointer(e)
  {
    console.log(e);

  }

  getItems(){
    let getItemsAPI = environment.BASE_API_URL+environment.ITEMS+"get-items";
    let headers = new HttpHeaders();
    let arr = Array();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    this.http.get(getItemsAPI,{headers:headers}).subscribe(data=>{
      JSON.parse(JSON.stringify(data)).forEach(element => {
        arr.push({
                  "id":element._id,
                  "item_name":element.item_name,
                  "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(element.item_img.data.data),
                  "contentType":element.item_img.contentType,
                  "desp":element.item_img.desc,
                  "price":element.item_price});
      });
      this.itemDatas = arr;
      this.tempDatas = arr;
      console.log(this.itemDatas)
    })
  }

  addItemToLocal(){
    console.log(this.itemId)
    console.log(this.weightInput);

    // this.getItemDetailsLocal(this.itemId,this.weightInput);
    if(this.filterTerm.length == 0){
      this.presentToast("top","Choose scraps")
    }else{
      if(this.weightInput == 0){
        console.log("none");
        this.presentToast("top","Please add weight")
      }else{
        let headers = new HttpHeaders();
        // let arr = Array();
        headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
        this.http.get(environment.BASE_API_URL+environment.ITEMS+this.itemId,{headers:headers}).subscribe(data=>{
          // this.itemReq.push({
          //       "item_id":data['_id'],
          //       "item_name":data['item_name'],
          //       "item_price":data['item_price'],
          //       "item_weight":this.weightInput,
          //       "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(data["item_img"]['data']['data']),
          //       "item_old":"0"
          // });
          console.log({
                  "item_id":data['_id'],
                  "item_name":data['item_name'],
                  "item_price":data['item_price'],
                  "item_weight":this.weightInput,
                  "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(data["item_img"]['data']['data']),
                  "item_old":"0"
            });

          this.getItemDetailsToLocal(this.itemId, data['item_name'], data['item_price'], this.weightInput, data["item_img"]['data']['data'])

        });

      }
    }


  }

  getItemDetailsLocal(id:any,weight:any){
    let headers = new HttpHeaders();
    // let arr = Array();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));

    // if(this.itemReq.length>0){
    //   let key=0;
    //   let flag=0;
    //   let weight = 0;

    //   console.log(this.itemReq)

    //   for(let item of this.itemReq){
    //     // console.log(item.item_id);
    //     if(item.item_id == id){
    //       // flag++
    //       console.log("duplicate item found");

    //       weight = this.itemReq[key].item_weight+this.weightInput;
    //       this.itemReq[key].item_weight = weight;
    //       this.totalPrice += weight*this.itemReq[key].item_price;

    //       flag = 1;
    //       break;
    //     }else{
    //       console.log("duplicate item found");
    //     }
    //     key++
    //   }

    //   console.log(flag+" - "+key);

    //   if(flag != 1){
    //       this.http.get(environment.BASE_API_URL+environment.ITEMS+id,{headers:headers}).subscribe(data=>{
    //         this.itemReq.push({
    //               "item_id":data['_id'],
    //               "item_name":data['item_name'],
    //               "item_price":data['item_price'],
    //               "item_weight":this.weightInput,
    //               "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(data["item_img"]['data']['data']),
    //               "item_old":"0"
    //         });
    //         // console.log(this.itemReq);
    //         ++this.count;
    //         this.totalPrice += this.weightInput*data['item_price'];
    //       });
    //   }

    //   // this.itemReq.every(item=>{
    //   //   key++;
    //   //   if(item.item_id==id){
    //   //     console.log("duplicate item update")
    //   //     console.log(this.itemReq[key-1])
    //   //     flag=1;
    //   //     weight = this.itemReq[key-1].item_weight+this.weightInput;
    //   //     this.itemReq[key-1].item_weight = weight;
    //   //     this.totalPrice = weight*this.itemReq[key-1].item_price;
    //   //     return false;
    //   //   }
    //   //   else{
    //   //     console.log("no duplicate")
    //   //     // this.http.get(environment.BASE_API_URL+environment.ITEMS+id,{headers:headers}).subscribe(data=>{
    //   //     this.http.get(environment.BASE_API_URL+environment.ITEMS+id,{headers:headers}).subscribe(data=>{
    //   //       this.itemReq.push({
    //   //             "item_id":data['_id'],
    //   //             "item_name":data['item_name'],
    //   //             "item_price":data['item_price'],
    //   //             "item_weight":this.weightInput,
    //   //             "item_img":"http://43.205.202.49/uploads/"+this.bufferArraytoData.arrayBufferToBase64(data["item_img"]['data']['data']),
    //   //             "item_old":"0"
    //   //       });
    //   //       // console.log(this.itemReq);
    //   //       ++this.count;
    //   //       this.totalPrice += this.weightInput*data['item_price'];
    //   //     });
    //   //     return true;
    //   //   }
    //   // })
    // }else{
    //   this.http.get(environment.BASE_API_URL+environment.ITEMS+id,{headers:headers}).subscribe(data=>{
    //     this.itemReq.push({
    //           "item_id":data['_id'],
    //           "item_name":data['item_name'],
    //           "item_price":data['item_price'],
    //           "item_weight":this.weightInput,
    //           "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(data["item_img"]['data']['data']),
    //           "item_old":"0"
    //     });
    //     // console.log(this.itemReq);
    //     ++this.count;
    //     this.totalPrice += this.weightInput*data['item_price'];
    //   });
    // }
    // console.log(this.itemReq)
  }

  getItemDetailsToLocal(id:any,name:any,price:any,weight:any,imageBuff:any,){
    let count = 0;
    console.log(id);
    console.log(weight);
    let headers = new HttpHeaders();
    // let arr = Array();
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    if(this.itemReq.length > 0){
      for(let item of this.itemReq){
        console.log(item);
        if(item.item_id==id){
          item.item_weight += weight;
          this.totalPrice = item.item_price * item.item_weight;
        }else{
          this.itemReq.push({
                "item_id":id,
                "item_name":name,
                "item_price":price,
                "item_weight":weight,
                "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(imageBuff),
                "item_old":"0"
          });
          console.log(this.weightInput*price);

          this.totalPrice += this.weightInput*price;
          this.weightInput = 0;
          this.filterTerm = "";
        }
        this.count++;
      }
    }else{
      // this.http.get(environment.BASE_API_URL+environment.ITEMS+id,{headers:headers}).subscribe(data=>{
        this.itemReq.push({
              "item_id":id,
              "item_name":name,
              "item_price":price,
              "item_weight":weight,
              "item_img":environment.IMAGE_URL+this.bufferArraytoData.arrayBufferToBase64(imageBuff),
              "item_old":"0"
        });
        // console.log(this.itemReq);
        console.log(this.weightInput*price);

        ++this.count;
        this.totalPrice += this.weightInput*price;
        this.weightInput = 0;
        this.filterTerm = ""
      // });
    }
  }

  fetchKeyUp(){
    if(this.filterTerm.length != 0){
      console.log(this.filterTerm);
      let filterValue = this.filterTerm
      this.itemDatas = this.itemDatas.filter(function(item:any){
          return item.item_name.toLowerCase().includes(filterValue.toLowerCase())
      })
      if(this.itemDatas.length == 0){
        this.suggest = false
        // this.getItems();
        this.itemDatas = this.tempDatas
      }else{
        // this.suggest = true
      }
    }else{
      // this.suggest = true;
      // this.hideSuggestBox();
      // this.getItems();
      this.itemDatas = this.tempDatas
    }

    console.log(this.itemDatas);
  }

  async createOrder(){
    let headers = new HttpHeaders();

    let req = {
      "order_by":localStorage.getItem("uid"),
      "items":this.itemReq
    };
    headers = headers.set("Authorization","Bearer "+localStorage.getItem('token'));
    await this.http.post(environment.BASE_API_URL+environment.ORDERS+"create-order",req,{headers:headers}).subscribe(data=>{

      console.log(data['o_id']);
      if(this.checkAddress()>0){
        // this.router.navigate(['pickup/1'])
      }else{
        this.router.navigate(['/pickup/'+data['o_id']])
      }
    });
  }
  removeItem(id){
    let key = 0;

    for(let item of this.itemReq){
      if(item.item_id==id){
        this.itemReq.splice(key,1);
        break;
      }
      key++;
    }

    // this.itemReq.forEach(item=>{
    //   if(this.itemReq.item_id == id){

    //   }
    //   key++;
    // })
  }

}
