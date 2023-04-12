import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AulaAPageRoutingModule } from './aula-a-routing.module';

import { AulaAPage } from './aula-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AulaAPageRoutingModule
  ],
  declarations: [AulaAPage]
})
export class AulaAPageModule {}
