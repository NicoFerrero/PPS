import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AulaAPage } from './aula-a.page';

const routes: Routes = [
  {
    path: '',
    component: AulaAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AulaAPageRoutingModule {}
