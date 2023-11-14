import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellTrashPageRoutingModule } from './sell-trash-routing.module';

import { SellTrashPage } from './sell-trash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellTrashPageRoutingModule
  ],
  declarations: [SellTrashPage]
})
export class SellTrashPageModule {}
