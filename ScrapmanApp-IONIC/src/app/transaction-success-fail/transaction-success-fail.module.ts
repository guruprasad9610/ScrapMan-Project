import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionSuccessFailPageRoutingModule } from './transaction-success-fail-routing.module';

import { TransactionSuccessFailPage } from './transaction-success-fail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionSuccessFailPageRoutingModule
  ],
  declarations: [TransactionSuccessFailPage]
})
export class TransactionSuccessFailPageModule {}
