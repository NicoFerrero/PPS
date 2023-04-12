import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropiasPage } from './propias.page';

const routes: Routes = [
  {
    path: '',
    component: PropiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropiasPageRoutingModule {}
