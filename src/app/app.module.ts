import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';
import { ChkinpDirective } from './chkinp.directive';
import { SpekeyDirective } from './spekey.directive';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FormfillComponent } from './formfill/formfill.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { ServerService } from './server.service';

@NgModule({
  declarations: [AppComponent, ShortenPipe, ChkinpDirective, SpekeyDirective, PageNotFoundComponent, HomeComponent, FormfillComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [AuthService, AuthGuardService, CanDeactivateGuardService, ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
