import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// geolocation and native-geocoder
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { NavParams } from '@ionic/angular';
import { AddAddressComponent } from './add-address/add-address.component';

import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { BuffertodataService } from './services/buffertodata.service';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';

// import { Compo }

@NgModule({
  declarations: [AppComponent,AddAddressComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, FormsModule],
  providers: [
    NavParams,
    AuthService,
    AuthGuard,
    LocationAccuracy,
    Geolocation,
    NativeGeocoder,
    HttpClientModule,
    BuffertodataService,
    DataService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
