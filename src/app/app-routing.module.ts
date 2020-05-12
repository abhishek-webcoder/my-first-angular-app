import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
//import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormfillComponent } from './formfill/formfill.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form', canActivate: [AuthGuardService], component: FormfillComponent, canDeactivate: [CanDeactivateGuardService] },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
