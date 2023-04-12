import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AulaBPage } from './aula-b.page';

const routes: Routes = [
  {
    path: '',
    component: AulaBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AulaBPageRoutingModule {}
