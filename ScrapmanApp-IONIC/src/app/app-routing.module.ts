import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'sell-trash',
    loadChildren: () => import('./sell-trash/sell-trash.module').then( m => m.SellTrashPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'pickup/:orderId',
    loadChildren: () => import('./pickup/pickup.module').then( m => m.PickupPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction-success-fail/transaction-success-fail.module').then( m => m.TransactionSuccessFailPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'my-order-details/:orderId',
    loadChildren: () => import('./my-order-details/my-order-details.module').then( m => m.MyOrderDetailsPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
