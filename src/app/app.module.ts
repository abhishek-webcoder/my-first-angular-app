import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { TokenInterceptorService } from './token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
//import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

// function tokenGetter() {
//   return localStorage.getItem('access_token');
// }

// export function jwtOptionsFactory() {
//   return {
//     tokenGetter: () => {
//       return localStorage.getItem('access_token');
//     },
//     whitelistedDomains: [
//           'https://angular-data-submit.firebaseio.com/data.json',
//         ],
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    ChkinpDirective,
    SpekeyDirective,
    PageNotFoundComponent,
    HomeComponent,
    FormfillComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    // JwtModule.forRoot({
    //   jwtOptionsProvider: {
    //     provide: JWT_OPTIONS,
    //     useFactory: jwtOptionsFactory,
    //   },
    // })
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: [
    //       'https://angular-data-submit.firebaseio.com/data.json',
    //     ],
    //     blacklistedRoutes: [''],
    //   },
    // }),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    CanDeactivateGuardService,
    ServerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
