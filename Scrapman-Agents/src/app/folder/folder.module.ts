import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

import { HomeComponent } from '../fragments/home/home.component';
import { OrdersComponent } from '../fragments/orders/orders.component';
import { ProfileComponent } from '../fragments/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
  ],
  declarations: [FolderPage,HomeComponent,OrdersComponent,ProfileComponent]
})
export class FolderPageModule {}
