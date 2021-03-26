import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTransactionPage } from './all-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: AllTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTransactionPageRoutingModule {}
