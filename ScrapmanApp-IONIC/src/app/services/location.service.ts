import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  

  constructor(private locationAcuuracy:LocationAccuracy,private nativeGeocoder:NativeGeocoder,private http:HttpClient) { }

  async enableLocation(){
    try{
      const canRequest:boolean = await this.locationAcuuracy.canRequest()
      console.log(canRequest)
      if(canRequest){
        await this.locationAcuuracy.request(this.locationAcuuracy.REQUEST_PRIORITY_BALANCED_POWER_ACCURACY);
        console.log("request successfull");
        return true;
      }
      return false;
    }catch(e){
      console.log(e)
    }
  }


  async reverseGeocoder(lat,long){

    const httpHeaders = new HttpHeaders();

    httpHeaders.set('x-rapidapi-host',"ba3ca290d3msh1445cc67dfa5388p186870jsn8fcfa463a03c");
    httpHeaders.set('x-rapidapi-host','feroeg-reverse-geocoding.p.rapidapi.com');



    const apiKey = "d68fc76823cd44279b2ccee7b2019666";


    // await this.http.get("https://geoapify-platform.p.rapidapi.com/v1/geocode/reverse?apiKey="+apiKey+"&lat="+lat+"&lon="+long+'&lang=en&limit=5',{headers:httpHeaders})
    //   .subscribe(resp=>{
    //     console.log(resp);
    //   });

    await this.http.get("https://api.geoapify.com/v1/geocode/reverse?lat="+lat+"&lon="+long+"&apiKey=d68fc76823cd44279b2ccee7b2019666&lang=en&limit=5",{headers:httpHeaders})
    .subscribe(resp=>{
      // console.log(resp["features"][1]["properties"]);
      if(resp["features"]>0){
        return JSON.stringify(resp["features"][1]);
      }else{
        return null;
      }
    })

  }

  geocoderAPI(){
    
  }
}
