import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionSuccessFailPage } from './transaction-success-fail.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionSuccessFailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSuccessFailPageRoutingModule {}
