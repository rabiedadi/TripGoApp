import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import {ErrorPageComponent} from './error-page/error-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'verify', component: HomeComponent },
  { path: 'creation', loadChildren: () => import('./mdl-establishment-creation/establishment-creation.module')
      .then(mod => mod.EstablishmentCreationModule), canActivate: [AuthGuard] },
  { path: 'detail', loadChildren: () => import('./mdl-establishment-detail/establishment-detail.module')
      .then(mod => mod.EstablishmentDetailModule) },
  { path: 'result', loadChildren: () => import('./mdl-search-result/search-result.module')
      .then(mod => mod.SearchResultModule) },
  { path: 'profile', loadChildren: () => import('./mdl-profile/profile.module')
      .then(mod => mod.ProfileModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./mdl-admin/admin.module')
      .then(mod => mod.AdminModule), canActivate: [AuthGuard] },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const AppRoutingComponents = [HomeComponent, ErrorPageComponent];
