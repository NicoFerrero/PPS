import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropiasPageRoutingModule } from './propias-routing.module';

import { PropiasPage } from './propias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropiasPageRoutingModule
  ],
  declarations: [PropiasPage]
})
export class PropiasPageModule {}
