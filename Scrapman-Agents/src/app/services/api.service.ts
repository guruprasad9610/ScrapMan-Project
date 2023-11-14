import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // httpHeader:any
  constructor(private http:HttpClient) {
    
   }

   getAssignedOrders(id:any,isReceived:any,from_date:any,end_date:any,header){
    return this.http.post(environment.BASE_API_URL+environment.ASSIGN+"get-assign-order",{ "id":id, "isReceived":isReceived, "date":end_date},{headers:header})
   }

   getOrdersByOrderId(id:any,header){
    return this.http.get(environment.BASE_API_URL+environment.ORDERS+id,{headers:header})
   }

   getAssignOrderDetails(id:any,header){
    return this.http.get(environment.BASE_API_URL+environment.ASSIGN+id,{headers:header})
   }

   receiveOrder(id:any,header){
    return this.http.get(environment.BASE_API_URL+environment.ASSIGN+"received-order/"+id,{headers:header});
   }
}
