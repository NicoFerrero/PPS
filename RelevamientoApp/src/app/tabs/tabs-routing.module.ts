import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'principal',
        children: [
          {
            path: '',
            loadChildren: '../principal/principal.module#PrincipalPageModule'
          }
        ]
      },
      {
        path: 'lindas',
        children: [
          {
            path: '',
            loadChildren: '../lindas/lindas.module#LindasPageModule'
          },
        ]
      },
      {
        path: 'feas',
        children: [
          {
            path: '',
            loadChildren: '../feas/feas.module#FeasPageModule'
          },
        ]
      },
      {
        path: 'propias',
        children: [
          {
            path: '',
            loadChildren: '../propias/propias.module#PropiasPageModule'
          },
        ]
      },
      {
        path: 'estadisticas',
        children: [
          {
            path: '',
            loadChildren: '../estadisticas/estadisticas.module#EstadisticasPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/principal',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/principal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
