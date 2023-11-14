import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellTrashPage } from './sell-trash.page';

const routes: Routes = [
  {
    path: '',
    component: SellTrashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellTrashPageRoutingModule {}
