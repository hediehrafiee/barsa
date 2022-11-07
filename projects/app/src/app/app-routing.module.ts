import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('barsa-login-page').then((m) => m.BarsaLoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('barsa-home-page').then((m) => m.BarsaHomePageModule),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
