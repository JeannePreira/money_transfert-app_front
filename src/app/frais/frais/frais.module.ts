import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FraisPageRoutingModule } from './frais-routing.module';

import { FraisPage } from './frais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FraisPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FraisPage]
})
export class FraisPageModule {}
