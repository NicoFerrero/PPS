import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  } /*,
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then((m) => m.PrincipalPageModule),
  },
  {
    path: 'lindas',
    loadChildren: () => import('./lindas/lindas.module').then((m) => m.LindasPageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'feas',
    loadChildren: () => import('./feas/feas.module').then( m => m.FeasPageModule)
  },
  {
    path: 'propias',
    loadChildren: () => import('./propias/propias.module').then( m => m.PropiasPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./componentes/modal/modal.module').then( m => m.ModalPageModule)
  }*/,
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
