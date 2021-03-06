import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'materias', loadChildren: './materias/materias.module#MateriasPageModule'},
  { path: 'oferta', loadChildren: './oferta/oferta.module#OfertaPageModule'},
  { path: 'ajustes', loadChildren: './ajustes/ajustes.module#AjustesPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'informacion', loadChildren: './informacion/informacion.module#InformacionPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
