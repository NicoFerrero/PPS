import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AulaBPageRoutingModule } from './aula-b-routing.module';

import { AulaBPage } from './aula-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AulaBPageRoutingModule
  ],
  declarations: [AulaBPage]
})
export class AulaBPageModule {}
