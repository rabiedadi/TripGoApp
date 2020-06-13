import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'verifyEmail/:token', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

export const ProfileRoutingComponents = [MainComponent, VerifyEmailComponent];
