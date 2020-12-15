import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: 'home',
  loadChildren: () => import('./home/home.module').then( m =>
 m.HomePageModule)
  },
  {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
  },
  {
  path: 'details/:id',
  loadChildren: () =>
 import('./pages/site-details/site-details.module').then( m =>
 m.SiteDetailsPageModule)
  },
  {
  path: 'details',
  loadChildren: () =>
 import('./pages/site-details/site-details.module').then( m =>
 m.SiteDetailsPageModule)
  },
  {
    path: 'site-details',
    loadChildren: () => import('./pages/site-details/site-details.module').then( m => m.SiteDetailsPageModule)
  },
 ];
 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
