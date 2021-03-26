import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/guards.guard';

import { FooterPage } from './footer.page';

const routes: Routes = [
  {
    path: 'footer',
    component: FooterPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('../transaction/transaction/transaction.module').then(m => m.TransactionPageModule)
      },
      {
        path: 'commission',
        loadChildren: () => import('../commission/commission/commission.module').then(m => m.CommissionPageModule)
      },
      {
        path: 'frais',
        loadChildren: () => import('../frais/frais/frais.module').then(m => m.FraisPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'footer/menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterPageRoutingModule {}
