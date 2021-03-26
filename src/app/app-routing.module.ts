import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/guards.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot/depot.module').then( m => m.DepotPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'frais',
    loadChildren: () => import('./frais/frais/frais.module').then( m => m.FraisPageModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'all-transaction',
    loadChildren: () => import('./transaction/all-transaction/all-transaction.module').then( m => m.AllTransactionPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./acceuil/accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'commission',
    loadChildren: () => import('./commission/commission/commission.module').then( m => m.CommissionPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait/retrait.module').then( m => m.RetraitPageModule),
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
